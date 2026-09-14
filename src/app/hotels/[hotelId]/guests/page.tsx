"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Building } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { EmptyState } from "@/components/common";
import {
  HOTEL_BOOKING_STEPS,
  BookingProgress,
} from "@/components/booking/BookingProgress";
import {
  HotelGuestForm,
  type HotelGuestErrors,
} from "@/components/hotels/HotelGuestForm";
import { HotelBookingSummary } from "@/components/hotels/HotelBookingSummary";
import { getHotel } from "@/services/hotelService";
import type { Hotel, HotelBookingData, HotelGuest } from "@/types/hotels";
import type { ContactInformation } from "@/types/booking";
import {
  getHotelSearchFromUrl,
  hotelBookingStorageKey,
  isHotelSearchComplete,
  resolveSelection,
  serializeHotelSearchParams,
} from "@/lib/hotelUtils";
const guest: HotelGuest = {
    id: "primary",
    title: "",
    firstName: "",
    lastName: "",
  },
  contact: ContactInformation = {
    email: "",
    phoneCode: "+91",
    phoneNumber: "",
  };
function valid(v: unknown, id: string, h: Hotel | null | undefined): v is HotelBookingData {
  const b = v as HotelBookingData;
  return (
    !!h &&
    !!b &&
    b.hotelId === id &&
    Array.isArray(b.selections) &&
    b.selections.length > 0 &&
    b.selections.every((s) => s.quantity > 0 && !!resolveSelection(h, s)) &&
    b.nightCount > 0
  );
}
function Guests({ hotelId }: { hotelId: string }) {
  const r = useRouter(),
    p = useSearchParams(),
    s = getHotelSearchFromUrl(p),
    q = serializeHotelSearchParams(s).toString();
  const [hotel, setHotel] = useState<Hotel | null | undefined>(undefined),
    [b, setB] = useState<HotelBookingData | null>(null),
    [g, setG] = useState(guest),
    [c, setC] = useState(contact),
    [e, setE] = useState<HotelGuestErrors>({}),
    [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    getHotel(hotelId).then((result) => { if (active) setHotel(result); });
    return () => { active = false; };
  }, [hotelId]);

  useEffect(() => {
    if (hotel === undefined) return;
    try {
      const x = sessionStorage.getItem(hotelBookingStorageKey(hotelId)),
        j = x ? JSON.parse(x) : null;
      if (valid(j, hotelId, hotel)) {
        setB(j);
        setG(j.guests?.[0] ?? guest);
        setC(j.contact ?? contact);
      }
    } catch {
    } finally {
      setReady(true);
    }
  }, [hotelId, hotel]);
  if (hotel === undefined)
    return <div className="section-gap min-h-[40vh]" aria-busy="true" />;
  if (!hotel)
    return (
      <div className="section-gap">
        <Container>
          <EmptyState
            title="Hotel not found"
            description="This hotel is unavailable."
            icon={<Building />}
            action={{
              label: "Hotel results",
              onClick: () => r.push("/hotels"),
            }}
          />
        </Container>
      </div>
    );
  if (!ready) return <div className="section-gap min-h-[40vh]" />;
  if (!isHotelSearchComplete(s) || !b)
    return (
      <div className="section-gap">
        <Container>
          <EmptyState
            title="Select rooms before adding guest details"
            description="Your stay context or room selection is missing or invalid."
            icon={<Building />}
            action={{
              label: "Select rooms",
              onClick: () => r.push(`/hotels/${hotelId}?${q}`),
            }}
          />
        </Container>
      </div>
    );
  const submit = () => {
    const n: HotelGuestErrors = {};
    if (!g.firstName.trim()) n.firstName = "First name is required.";
    if (!g.lastName.trim()) n.lastName = "Last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim()))
      n.email = "Enter a valid email address.";
    if (!c.phoneCode.trim()) n.phoneCode = "Country code is required.";
    if (!/^\d{5,15}$/.test(c.phoneNumber.replace(/[\s-]/g, "")))
      n.phoneNumber = "Enter a valid phone number.";
    setE(n);
    if (Object.keys(n).length) return;
    sessionStorage.setItem(
      hotelBookingStorageKey(hotelId),
      JSON.stringify({
        ...b,
        guests: [
          { ...g, firstName: g.firstName.trim(), lastName: g.lastName.trim() },
        ],
        contact: {
          ...c,
          email: c.email.trim(),
          phoneNumber: c.phoneNumber.trim(),
        },
      }),
    );
    r.push(`/hotels/${hotelId}/review?${q}`);
  };
  return (
    <div className="section-gap pb-20">
      <Container>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => r.push(`/hotels/${hotelId}?${q}`)}
          icon={<ArrowLeft size={16} />}
        >
          Back to rooms
        </Button>
        <BookingProgress
          currentStep="guests"
          steps={HOTEL_BOOKING_STEPS}
          className="mx-auto mb-6 max-w-3xl"
        />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <HotelGuestForm
            guest={g}
            contact={c}
            errors={e}
            onGuestChange={(f, v) => {
              setG({ ...g, [f]: v });
              setE({ ...e, [f]: undefined });
            }}
            onContactChange={(f, v) => {
              setC({ ...c, [f]: v });
              setE({ ...e, [f]: undefined });
            }}
            onSubmit={submit}
          />
          <HotelBookingSummary hotel={hotel} booking={b} query={q} />
        </div>
      </Container>
    </div>
  );
}
export default function Page({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) {
  const { hotelId } = React.use(params);
  return (
    <Suspense fallback={<div className="section-gap min-h-[40vh]" />}>
      <Guests hotelId={hotelId} />
    </Suspense>
  );
}
