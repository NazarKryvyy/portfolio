import { useForm } from "react-hook-form";

const RegisterForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          {...register("avatar", { required: true })}
          type="text"
          className="form-control"
          id="avatar"
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          {...register("username", { required: true })}
          type="text"
          className="form-control"
          id="username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          {...register("email", { required: true })}
          type="email"
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          {...register("passwordConfirmation", { required: true })}
          type="password"
          className="form-control"
          id="passwordConfirmation"
        />
      </div>
      <button type="submit" className="btn btn-main bg-blue py-2 ttu">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
