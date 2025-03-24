import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import React from "react";

const Btn = styled.button`
  background-color:white;
  color:#a5c1e8;
  border: 0;
  cursor: pointer;
  margin: 10px 0;
  margin-left: 10px;
  font-size: 16px;
  font-weight: 600;

`;
const RmBtn = styled(Btn)`
  color: #f08585;
`;
const Li = styled.li`
  list-style-type: none;
`;
const Div = styled.div`
  background-color: white;
  margin-top: 10px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;
const Span = styled.span`
  color:#a5c1e8;
  display: flex;
  padding: 3px 12px;
  padding-top: 10px;
  font-size: 24px;
  font-weight: 600;
`;
function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((prev) =>
      prev.map((oldToDo) => {
        if (oldToDo.id === id) {
          return { ...oldToDo, category: name as unknown as Categories };
        }
        return oldToDo;
      })
    );
  };
  const remove = () => {
    setToDos((oldToDos) => oldToDos.filter((todo) => todo.id !== id));
  };
  return (
    <Div>
      <Li>
        <Span>{text}</Span>
        {category !== Categories.DOING && (
          <Btn name={Categories.DOING + ""} onClick={onClick}>
            Doing
          </Btn>
        )}
        {category !== Categories.TO_DO && (
          <Btn name={Categories.TO_DO + ""} onClick={onClick}>
            To Do
          </Btn>
        )}
        {category !== Categories.DONE && (
          <Btn name={Categories.DONE + ""} onClick={onClick}>
            Done
          </Btn>
        )}
        <RmBtn onClick={remove}>Delete</RmBtn>
      </Li>
    </Div>
  );
}
export default ToDo;
