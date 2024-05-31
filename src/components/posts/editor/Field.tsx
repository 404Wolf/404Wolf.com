interface FieldProps {
  name: string;
  startValue: string;
  setValue: (newValue: any) => void;
  tall?: boolean;
  height?: number | string;
  nontallWidth?: string;
  tallWidth?: string;
  border?: boolean;
}

const Field = ({
  name,
  startValue,
  setValue,
  tall = false,
  height = "auto",
  nontallWidth,
  tallWidth,
  border = true,
}: FieldProps) => {
  return (
    <div className="relative">
      <div className="-top-2 -right-2 px-1 rounded-tl-xl rounded-bl-xl text-xs absolute bg-gray-500 rounded-xl text-white">
        {name}
      </div>
      {tall ? (
        <textarea
          onChange={(e) => setValue(e.target.value)}
          defaultValue={startValue}
          className={`focus:outline-none bg-gray-200 ${
            tallWidth || "w-full"
          } rounded-xl min-h-[100px] ${border && "border-2 border-white"} pl-1`}
        />
      ) : (
        <input
          style={{ height: height }}
          className={`focus:outline-none bg-gray-200 ${
            nontallWidth || "w-max"
          } rounded-xl ${border && "border-white border-2"} pl-1`}
          defaultValue={startValue}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
};

export default Field;
