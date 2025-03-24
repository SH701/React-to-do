import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";

const Div = styled.div`
  width: 480px;
  margin: 0 auto;
`;
const H = styled.h1`
  color: #444444;
  font-weight: 600;
  text-align: center;
  padding: 32px;
  font-size: 64px;
`;
const Btndiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;
const Btn = styled.button`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 3px solid transparent;
  padding: 8px 16px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  color: #a5c1e8;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    border: 3px solid #a5c1e8;
    opacity: 0.8;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [, setCategory] = useRecoilState(categoryState);
  const categories = [
    { key: "TO_DO", label: "To Do" },
    { key: "DOING", label: "Doing" },
    { key: "DONE", label: "Done" },
  ];

  const handleCategory = (category: Categories) => {
    setCategory(category);
  };

  return (
    <Div>
      <H>To Do</H>
      <Btndiv>
        {categories.map((index) => (
          <Btn
            key={index.key}
            onClick={() => handleCategory(index.key as Categories)}
          >
            {index.label}
          </Btn>
        ))}
      </Btndiv>
      <hr />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Div>
  );
}
export default ToDoList;
