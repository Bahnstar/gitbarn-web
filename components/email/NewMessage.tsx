type Props = {
  chatId: string
  chatTitle: string
  senderName: string
  messagePreview: string
}

export const NewMessageEmailTemplate = (props: Props) => (
  <div style={styles.container}>
    <div style={styles.innerContainer}>
      <h1 style={styles.heading}>New Support Message</h1>
      <p style={styles.paragraph}>You have received a new message in the following support chat:</p>
      <p style={styles.chatTitle}>{props.chatTitle}</p>
      <p style={styles.paragraph}>
        <strong>From:</strong> {props.senderName}
      </p>
      <p style={styles.paragraph}>
        <strong>Message Preview:</strong>
      </p>
      <p style={styles.messagePreview}>{props.messagePreview}</p>
      <p style={styles.paragraph}>
        Please log in to the GitBarn portal to view and respond to this message.
      </p>
      <div style={styles.buttonContainer}>
        <a href={`${process.env.URL}/support/chat?id=${props.chatId}`} style={styles.button}>
          View Chat
        </a>
      </div>
      <p style={styles.footer}>Thank you for your prompt attention to this matter.</p>
    </div>
  </div>
)

const styles = {
  container: {
    backgroundColor: "#ffffff",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    padding: "40px",
  },
  innerContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#000000",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center" as const,
    marginBottom: "30px",
    textTransform: "uppercase" as const,
    letterSpacing: "2px",
  },
  paragraph: {
    color: "#333333",
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  chatTitle: {
    backgroundColor: "#f8f8f8",
    borderLeft: "4px solid #000000",
    color: "#000000",
    fontSize: "18px",
    fontWeight: "600",
    padding: "15px",
    marginBottom: "20px",
  },
  messagePreview: {
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    color: "#333333",
    fontSize: "16px",
    padding: "15px",
    marginBottom: "20px",
    fontStyle: "italic",
  },
  footer: {
    color: "#666666",
    fontSize: "14px",
    fontStyle: "italic",
    marginTop: "30px",
  },
  buttonContainer: {
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    borderRadius: "4px",
    display: "inline-block",
  },
}

export default NewMessageEmailTemplate
