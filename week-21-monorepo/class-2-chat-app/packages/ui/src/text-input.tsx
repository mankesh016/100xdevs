interface PropsType {
  placeholder: string;
}
export const TextInput = ({ placeholder }: PropsType) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      style={{ margin: 10, padding: 10 }}
    />
  );
};
