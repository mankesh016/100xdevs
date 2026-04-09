export interface InputProps {
  ref?: any;
  placeholder?: string;
}

export const Input = (props: InputProps) => {
  return (
    <div>
      <input
        className="border border-gray-300 w-full p-2 rounded-md"
        type="text"
        ref={props.ref}
        placeholder={props.placeholder}
      />
    </div>
  );
};
