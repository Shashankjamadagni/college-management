import { UserContext } from "../context/loginContext"
import { useContext,useNavigate } from "react"

export default function Register() {

    const userContext = useContext(UserContext)
  
    if(!userContext) {
      throw new Error("useUser must be used within a UserProvider")
          }
    
    }
    const {setState} = UserContext;
  
    const navigate = useNavigate()

    async function registerUser(
        fullName,
        email,
        password,
        role,
      ) {
        try {
          const response = await api.post("/users/v1/register", {
            fullName,
            email,
            password,
            role,
          });
    
          if (response.status === 201) {
            navigate("/login"); 
          }
        } catch (error) {
          console.error(error);
        }
      }