interface IErrorMessageBarProps {
  errors: string[];
}

const ErrorMessageBar = ({ errors }: IErrorMessageBarProps) => {
  return (
    <div className='bg-white dark:dark:bg-neutral-850 border-t-2 dark:border-neutral-800'>
      {errors.map((message, key) => (
        <p key={key} className='text-red-800 dark:text-red-400/70'>
          {message}
        </p>
      ))}
    </div>
  );
};
export default ErrorMessageBar;
