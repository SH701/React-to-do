import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

const Form = styled.form`
  margin-top: 20px;
  display: flex;
`;
const Input = styled.input`
  width: 410px;
  height: 50px;
  border-radius: 10px;
  border: 0;
  padding-left: 10px;
  font-size: 18px;
  &::placeholder {
    font-size: 18px;
    color:#a5c1e8;
    font-weight: bold;
  }
  &:focus {
  outline: none;
  color: #a5c1e8;
  font-weight: bold;
}
`;
const Btn = styled.button`
  border:0;
  background-color: white;
  color: #a5c1e8;
  width:12%;
  height: 48px;
  margin-left: 15px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
`;
const Div = styled.div`
  position: relative;
`
const Rmbtn = styled.button`
  border: 0;
  position: absolute;
  right:3%;
  top:30%;
  background-color: white;
  color:#a5c1e8;
  font-weight: bold;
  font-size: 14px;
`

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValue = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  const remove = () => {
    setValue("toDo","");
  };
  return (
    <Form onSubmit={handleSubmit(handleValue)}>
      <Div>
      <Input
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder="Enter your to do."
      />
      <Rmbtn type="button" onClick={remove}>X</Rmbtn>
      </Div>
      <Btn type="submit">Add</Btn>
    </Form>
  );
}
export default CreateToDo;
