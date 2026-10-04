"use client";
import { resetPassword } from "@/lib/auth-client";
import {Check, Eye, EyeSlash} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
 
  InputGroup,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";


const ResetPasswordForm = () => {
    const [isVisible, setIsVisible] = useState(false);

    const searchPeram = useSearchParams()
    const token = searchPeram.get("token")

    const HandleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries())

    const resData = await resetPassword({
        newPassword : userData.password as string,
        token : token as string
    })
    console.log('after reset submit' ,resData)
    toast.success('your password is reset successfully')


    }
    return (
        <div>
            <h2>Enter a new password</h2>


            <Form className="flex w-96 flex-col gap-4" onSubmit={HandleResetPassword}>
     
       <TextField 
        className="w-full max-w-100" 
        name="password"

        validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }

            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }

            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >


      <Label>Password</Label>
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-100"
          type={isVisible ? "text" : "password"}
          
        />
        <InputGroup.Suffix className="pe-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
      <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>

          <FieldError />
    </TextField>

      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
            
            
        </div>
    );
};

export default ResetPasswordForm;