import emailjs from "@emailjs/browser";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Fox } from "../models/Fox";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
const Contact = () => {
  const [form, setForm] = useState({name: "", email: "", message: "" });
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [currentAnimation,setCurrentAnimation]=useState('idle');
  const {alert,showAlert,hideAlert}=useAlert();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit")
    emailjs
      .sendForm(
        import.meta.env.SERVICE_ID,
        import.meta.env.TEMPLATE_ID,
        formRef.current,
        import.meta.env.PUBLIC_KEY
      )
      .then(() => {
          setLoading(false);
          //alert("Message successfully sent!");
          showAlert({text:'Message successfully sent!',type:'success'})
          setTimeout(()=>{
            hideAlert();
            setCurrentAnimation("idle")
            setForm({name:'',email:'',message:''})
          },3000)
        }
      )
      .catch((e) => {
        setLoading(false);
        setCurrentAnimation("idle")
        //alert("Failed to send the message, please try again");
        showAlert({type:'danger',text:'Failed to send the message, please try again'})
        console.log(e);
      });
  };
  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in touch</h1>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="flex w-full flex-col gap-7 mt-14"
        >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Ahmed"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Ahmed@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Your Message
            <textarea
              name="message"
              rows="4"
              className="textarea"
              placeholder="Write your thoughts here..."
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="btn"
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Fox
            currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
