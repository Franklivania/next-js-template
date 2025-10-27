// Accessibility Examples for the Button Component
import { Button } from "../button";

/**
 * Examples demonstrating proper ARIA usage with the Button component
 */

// Example 1: Button with title for additional context
export function ButtonWithTitle() {
  return (
    <Button
      title="Save your current progress and continue editing later"
      variant="default"
    >
      Save Draft
    </Button>
  );
  // Screen reader announces: "Save Draft, Save your current progress and continue editing later"
}

// Example 2: Icon button with aria-label (highest priority)
export function IconButtonWithAriaLabel() {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Close dialog"
      title="Click to close this dialog"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </Button>
  );
  // Screen reader announces: "Close dialog" (aria-label takes priority over title)
}

// Example 3: Button with complex content and descriptive title
export function ComplexButtonWithTitle() {
  return (
    <Button
      title="Delete the selected user account permanently. This action cannot be undone."
      variant="destructive"
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      Delete User
    </Button>
  );
  // Screen reader announces: "Delete User, Delete the selected user account permanently. This action cannot be undone."
}

// Example 4: Button with external aria-describedby reference
export function ButtonWithExternalDescription() {
  return (
    <div>
      <Button aria-describedby="save-help-text" variant="default">
        Save Changes
      </Button>
      <p id="save-help-text" className="text-sm text-muted-foreground mt-2">
        Your changes will be automatically synced across all devices.
      </p>
    </div>
  );
  // Screen reader announces: "Save Changes, Your changes will be automatically synced across all devices."
}

// Example 5: Disabled button with explanation
export function DisabledButtonWithTitle() {
  return (
    <Button
      disabled
      title="Please fill in all required fields before submitting"
      variant="default"
    >
      Submit Form
    </Button>
  );
  // Screen reader announces: "Submit Form, disabled, Please fill in all required fields before submitting"
}

// Example 6: Link button (using asChild)
export function LinkButtonWithTitle() {
  return (
    <Button asChild variant="link" title="Opens the user guide in a new tab">
      <a href="/docs" target="_blank" rel="noopener noreferrer">
        View Documentation
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </Button>
  );
  // Screen reader announces: "View Documentation, link, Opens the user guide in a new tab"
}

/**
 * Best Practices for Button Accessibility:
 *
 * 1. Use `aria-label` for icon-only buttons or when you need to override the visible text
 * 2. Use `title` to provide additional context or instructions
 * 3. The component automatically handles the priority: aria-label > title > children text
 * 4. For complex descriptions, use `aria-describedby` with an external element
 * 5. Always ensure buttons have a clear, descriptive accessible name
 * 6. Use semantic HTML (button element) for better screen reader support
 * 7. Ensure sufficient color contrast for all button variants
 * 8. Test with actual screen readers (NVDA, JAWS, VoiceOver)
 */
