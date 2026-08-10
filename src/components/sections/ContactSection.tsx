import { Mail, MessageCircle, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { SectionHeading } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection({ withHeading = true }: { withHeading?: boolean }) {
  const [sending, setSending] = useState(false);

  // Phase 1: UI only. Message delivery is wired up with Supabase in a later phase.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message captured", {
        description: "Contact delivery is connected in a later phase.",
      });
    }, 500);
  }

  return (
    <section className="container-page py-16 sm:py-20">
      {withHeading && (
        <SectionHeading
          centered
          eyebrow="Contact"
          title="Talk to BELIGHT TECH"
          description="Questions about courses, training or partnerships? Send us a message."
        />
      )}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="border-border/80 shadow-soft">
          <CardContent className="pt-6">
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" name="name" placeholder="Your full name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="How can we help?"
                  required
                />
              </div>
              <Button type="submit" className="w-full rounded-full sm:w-auto" disabled={sending}>
                {sending ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-surface shadow-soft">
          <CardContent className="space-y-5 pt-6">
            <h3 className="text-lg font-bold">Other ways to reach us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="font-semibold">Email</p>
                  <p className="truncate text-muted-foreground">hello@belighttech.example</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-muted-foreground">Add your contact number</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-muted-foreground">Add your WhatsApp number</p>
                </div>
              </li>
            </ul>
            <div>
              <p className="text-sm font-semibold">Social links</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Social profiles will be added here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
