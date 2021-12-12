import { useForm } from "react-hook-form";

const LoginForm = ({ onSubmit, loading }) => {
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          name="email"
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          name="password"
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      {loading && "Signing in..."}
      {!loading && (
        <button type="submit" className="btn btn-main bg-blue py-2 ttu">
          Submit
        </button>
      )}
    </form>
  );
};

export default LoginForm;
