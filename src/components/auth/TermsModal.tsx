"use client"

import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TermsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAccept: () => void
}

export function TermsModal({ open, onOpenChange, onAccept }: TermsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Terms & Privacy</DialogTitle>
          <DialogDescription>Please review our terms of service and privacy policy</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Terms of Service</h3>
            <p>By creating an account, you agree to our Terms of Service. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Using the platform for educational purposes only</li>
              <li>Maintaining the security of your account</li>
              <li>Respecting intellectual property rights</li>
              <li>Following community guidelines</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Privacy Policy</h3>
            <p>We value your privacy and are committed to protecting your personal information:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>We collect only necessary information for service provision</li>
              <li>Your data is encrypted and securely stored</li>
              <li>We never share your information with third parties without consent</li>
              <li>You can request data deletion at any time</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                By creating an account, you acknowledge that you have read and understood our Terms of Service and
                Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        <Button onClick={onAccept} className="w-full">
          I Understand
        </Button>
      </DialogContent>
    </Dialog>
  )
}
