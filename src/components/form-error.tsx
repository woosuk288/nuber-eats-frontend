interface IFormErrorProps {
  errorMessage: string;
}

export const FormError = ({ errorMessage }: IFormErrorProps) => (
  <span role="alert" className="font-medium text-red-500">
    {errorMessage}
  </span>
);
