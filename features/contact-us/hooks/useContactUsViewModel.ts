import { useState } from "react";

export function useContactUsViewModel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  const handleSubmit = () => {
    let hasError = false;
    setNameError(null);
    setEmailError(null);
    setMessageError(null);

    if (!name.trim()) {
      setNameError("Name is required");
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email");
      hasError = true;
    }

    if (!message.trim()) {
      setMessageError("Message is required");
      hasError = true;
    }

    if (!hasError) {
      // Handle form submission (e.g., send to server or show confirmation)
      console.log({ name, email, message });
    }
  };

  return {
    name,
    setName,
    nameError,
    email,
    setEmail,
    emailError,
    message,
    setMessage,
    messageError,
    handleSubmit,
  };
}
