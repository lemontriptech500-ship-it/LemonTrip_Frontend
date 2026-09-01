'use client'

import React, { useState } from 'react'
import { Plane, HotelIcon, MapPinIcon, PlaneTakeoff, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Container,
  SectionHeading,
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Switch,
  FormField,
  Badge,
  Card,
  Alert,
  Tabs,
  Accordion,
  Dropdown,
  Modal,
  Tooltip,
  Skeleton,
  LoadingSpinner,
} from '@/components/ui'
import { EmptyState, ErrorState } from '@/components/common'

// ============================================================
// Design System Preview Page
// Internal route to visually verify all UI components.
// ============================================================

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [switchOn, setSwitchOn] = useState(false)

  return (
    <div className="section-gap bg-[var(--color-background)] pb-32">
      <Container>
        <div className="mb-12">
          <SectionHeading
            title="LemonTrip Design System"
            description="Visual foundation and component library."
          />
        </div>

        <div className="flex flex-col gap-16">
          {/* Colors */}
          <section>
            <h3 className="text-h3 mb-6 text-[var(--color-text-primary)]">Colors</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              <ColorBox label="Primary" color="var(--color-primary)" />
              <ColorBox label="Primary Hover" color="var(--color-primary-hover)" />
              <ColorBox label="Primary Active" color="var(--color-primary-active)" />
              <ColorBox label="Primary Soft" color="var(--color-primary-soft)" textColor="var(--color-text-primary)" />
              
              <ColorBox label="Secondary" color="var(--color-secondary)" />
              <ColorBox label="Secondary Hover" color="var(--color-secondary-hover)" />
              
              <ColorBox label="Accent" color="var(--color-accent)" />
              <ColorBox label="Accent Soft" color="var(--color-accent-soft)" textColor="var(--color-text-primary)" />
              
              <ColorBox label="Background" color="var(--color-background)" textColor="var(--color-text-primary)" hasBorder />
              <ColorBox label="Surface" color="var(--color-surface)" textColor="var(--color-text-primary)" hasBorder />
              <ColorBox label="Surface Sec." color="var(--color-surface-secondary)" textColor="var(--color-text-primary)" hasBorder />
              
              <ColorBox label="Border" color="var(--color-border)" textColor="var(--color-text-primary)" />
              <ColorBox label="Border Light" color="var(--color-border-light)" textColor="var(--color-text-primary)" />
            </div>
          </section>

          {/* Typography */}
          <section>
            <h3 className="text-h3 mb-6 text-[var(--color-text-primary)]">Typography</h3>
            <Card className="flex flex-col gap-6">
              <div>
                <span className="text-caption text-[var(--color-text-muted)]">.text-display</span>
                <div className="text-display">Display Heading</div>
              </div>
              <div>
                <span className="text-caption text-[var(--color-text-muted)]">.text-h1</span>
                <div className="text-h1">Heading 1</div>
              </div>
              <div>
                <span className="text-caption text-[var(--color-text-muted)]">.text-h2</span>
                <div className="text-h2">Heading 2</div>
              </div>
              <div>
                <span className="text-caption text-[var(--color-text-muted)]">.text-h3</span>
                <div className="text-h3">Heading 3</div>
              </div>
              <div>
                <span className="text-caption text-[var(--color-text-muted)]">.text-h4</span>
                <div className="text-h4">Heading 4</div>
              </div>
              <div>
                <span className="text-caption text-[var(--color-text-muted)]">.text-body-lg</span>
                <div className="text-body-lg">Body Large: The quick brown fox jumps over the lazy dog.</div>
              </div>
              <div>
                <span className="text-caption text-[var(--color-text-muted)]">.text-body</span>
                <div className="text-body">Body Regular: The quick brown fox jumps over the lazy dog.</div>
              </div>
              <div>
                <span className="text-caption text-[var(--color-text-muted)]">.text-body-sm</span>
                <div className="text-body-sm">Body Small: The quick brown fox jumps over the lazy dog.</div>
              </div>
              <div>
                <span className="text-caption text-[var(--color-text-muted)]">.text-label</span>
                <div className="text-label">Label: For form elements</div>
              </div>
              <div>
                <span className="text-caption text-[var(--color-text-muted)]">.text-caption</span>
                <div className="text-caption">Caption: For fine print and metadata</div>
              </div>
            </Card>
          </section>

          {/* Buttons */}
          <section>
            <h3 className="text-h3 mb-6 text-[var(--color-text-primary)]">Buttons</h3>
            <div className="flex flex-wrap gap-6 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              
              <div className="w-full h-px bg-[var(--color-border)] my-2" />
              
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button icon={<PlaneTakeoff size={18} />}>With Icon</Button>
            </div>
          </section>

          {/* Form Controls */}
          <section>
            <h3 className="text-h3 mb-6 text-[var(--color-text-primary)]">Form Controls</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-6">
                <Input label="Standard Input" placeholder="Enter text..." />
                <Input label="With Icon" placeholder="Search..." leadingIcon={<MapPinIcon />} />
                <Input label="Error State" placeholder="Enter email" error="Invalid email address" />
                <Select label="Select Destination">
                  <option>Paris, France</option>
                  <option>Tokyo, Japan</option>
                  <option>New York, USA</option>
                </Select>
                <Textarea label="Message" placeholder="Leave a comment..." />
              </div>
              <div className="flex flex-col gap-6 pt-8">
                <Checkbox label="Accept terms and conditions" description="You must agree to continue." />
                <Checkbox label="Disabled Checkbox" disabled />
                <div className="flex flex-col gap-2">
                  <Radio label="Option 1" name="radio-group" />
                  <Radio label="Option 2" name="radio-group" defaultChecked />
                </div>
                <Switch 
                  label="Enable Notifications" 
                  description="Receive email alerts" 
                  checked={switchOn} 
                  onCheckedChange={setSwitchOn} 
                />
                
                <FormField label="Custom Field" helperText="Uses FormField wrapper">
                  <div className="h-10 w-full rounded border-2 border-dashed border-[var(--color-border)] flex items-center justify-center text-sm text-[var(--color-text-muted)]">
                    Custom Component Area
                  </div>
                </FormField>
              </div>
            </div>
          </section>

          {/* Badges & Cards */}
          <section>
            <h3 className="text-h3 mb-6 text-[var(--color-text-primary)]">Badges & Cards</h3>
            <div className="mb-6 flex gap-4 flex-wrap">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card shadow="sm">
                <h4 className="font-semibold mb-2">Small Shadow</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">Standard card surface.</p>
              </Card>
              <Card shadow="md" hover>
                <h4 className="font-semibold mb-2">Medium Shadow + Hover</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">Lifts on hover.</p>
              </Card>
              <Card shadow="lg">
                <h4 className="font-semibold mb-2">Large Shadow</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">For prominent elements.</p>
              </Card>
            </div>
          </section>

          {/* Feedback */}
          <section>
            <h3 className="text-h3 mb-6 text-[var(--color-text-primary)]">Alerts</h3>
            <div className="flex flex-col gap-4 max-w-3xl">
              <Alert variant="info" title="Information">This is an informational message about your trip.</Alert>
              <Alert variant="success" title="Success">Your booking has been confirmed!</Alert>
              <Alert variant="warning" title="Warning">Your session is about to expire.</Alert>
              <Alert variant="error" title="Error" onDismiss={() => {}}>Failed to process payment. Please try again.</Alert>
            </div>
          </section>

          {/* Interactive */}
          <section>
            <h3 className="text-h3 mb-6 text-[var(--color-text-primary)]">Interactive Components</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="mb-4 text-h4">Tabs</h4>
                <Card padding="none">
                  <Tabs
                    items={[
                      { id: 'flights', label: 'Flights', content: <div className="p-6">Flight Search Content</div> },
                      { id: 'hotels', label: 'Hotels', content: <div className="p-6">Hotel Search Content</div> },
                    ]}
                  />
                </Card>
              </div>

              <div>
                <h4 className="mb-4 text-h4">Accordion</h4>
                <Accordion
                  items={[
                    { id: '1', title: 'What is LemonTrip?', content: 'LemonTrip is a modern travel booking platform.' },
                    { id: '2', title: 'How do I cancel my booking?', content: 'You can cancel from your dashboard.' },
                  ]}
                />
              </div>

              <div className="flex gap-12">
                <div>
                  <h4 className="mb-4 text-h4">Dropdown</h4>
                  <Dropdown
                    trigger={<Button variant="outline">Options <ChevronDownIcon /></Button>}
                  >
                    <div className="flex flex-col py-1">
                      <button className="px-4 py-2 text-left hover:bg-[var(--color-surface-secondary)]">Profile</button>
                      <button className="px-4 py-2 text-left hover:bg-[var(--color-surface-secondary)]">Settings</button>
                      <button className="px-4 py-2 text-left text-[var(--color-error)] hover:bg-[var(--color-error-bg)]">Logout</button>
                    </div>
                  </Dropdown>
                </div>
                
                <div>
                  <h4 className="mb-4 text-h4">Tooltip</h4>
                  <Tooltip content="Provides extra context">
                    <Button variant="secondary" icon={<Info size={16} />}>Hover me</Button>
                  </Tooltip>
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-h4">Modal</h4>
                <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                <Modal
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Review Booking"
                  footer={
                    <div className="flex justify-end gap-3">
                      <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                      <Button onClick={() => setModalOpen(false)}>Confirm</Button>
                    </div>
                  }
                >
                  <p>Please review your details before continuing to payment.</p>
                </Modal>
              </div>
            </div>
          </section>

          {/* Loading & Empty States */}
          <section>
            <h3 className="text-h3 mb-6 text-[var(--color-text-primary)]">States</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-6">
                <Card>
                  <h4 className="mb-4 font-semibold">Skeleton Shimmer</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-12 w-12" circle />
                    <div className="flex flex-col gap-2 w-full">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-24 w-full" />
                </Card>
                
                <Card className="flex items-center justify-center py-12">
                  <LoadingSpinner text="Searching best prices..." />
                </Card>
              </div>

              <div className="flex flex-col gap-6">
                <EmptyState
                  title="No bookings found"
                  description="You haven't made any bookings yet."
                  action={{ label: 'Explore Flights', onClick: () => {} }}
                />
                
                <ErrorState 
                  title="Connection Error"
                  description="We couldn't reach the server."
                  onRetry={() => {}}
                />
              </div>
            </div>
          </section>

        </div>
      </Container>
    </div>
  )
}

function ColorBox({ label, color, textColor = 'var(--color-text-primary)', hasBorder = false }: { label: string, color: string, textColor?: string, hasBorder?: boolean }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] shadow-sm">
      <div 
        className={cn('h-16 flex items-center justify-center font-mono text-xs font-medium', hasBorder && 'border-b border-[var(--color-border)]')} 
        style={{ backgroundColor: color, color: textColor }}
      >
        {color}
      </div>
      <div className="bg-[var(--color-surface)] px-3 py-2 text-center text-xs font-semibold text-[var(--color-text-primary)]">
        {label}
      </div>
    </div>
  )
}

// Simple icon for preview layout
function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="m6 9 6 6 6-6"/></svg>
  )
}
