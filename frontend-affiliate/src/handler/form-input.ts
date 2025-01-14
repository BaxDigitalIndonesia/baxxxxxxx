import { SEND_AFFILIATE } from "@/app/api/teamList/affiliate";
import { RegisterByMitra } from "@/interface";
import {
  nameSchema,
  phoneSchema,
  emailSchema,
  passwordSchema,
} from "@/interface/joiValidate";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HandlerForm() {
  const router = useRouter();

  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState<RegisterByMitra>({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    try {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === "name") {
        const validation = nameSchema.validate(value);
        if (validation.error) {
          setNameError(validation.error.message);
        } else {
          setNameError("");
        }
      }
      if (name === "phone") {
        const validation = nameSchema.validate(value);
        if (validation.error) {
          setNameError(validation.error.message);
        } else {
          setNameError("");
        }
      }
      if (name === "phone") {
        const validation = phoneSchema.validate(value);
        if (validation.error) {
          setPhoneError(validation.error.message);
        } else {
          setPhoneError("");
        }
      }
      // if (name === "email") {
      //   const validation = emailSchema.validate(value);
      //   if (validation.error) {
      //     setEmailError(validation.error.message);
      //   } else {
      //     setEmailError("");
      //   }
      // }
      // if (name === "password") {
      //   const validation = passwordSchema.validate(value);
      //   if (validation.error) {
      //     setPasswordError(validation.error.message);
      //   } else {
      //     setPasswordError("");
      //   }
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log(formData);
    setLoadingSubmit(true);
    try {
      const response = await SEND_AFFILIATE(formData);

      const data = await response.json();
      if (!response.ok) {
        setSubmitError("Failed to register data");
      }
      if (data.status === 201) {
        return router.push(`/dashboard/teamlist`);
      } else {
        setSubmitError("Registration failed");
      }
    } catch (err: any) {
      setSubmitError("error submit failed");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return {
    handleSubmit,
    handleInputChange,
    phoneError,
    nameError,
    passwordError,
    emailError,
    formData,
    loadingSubmit,
  };
}
