import styled from "styled-components";
// umoznuje pouzivani vlastnich tagu napr. <Vystraha>
// vyzaduje instalaci npm i styled-components
// extension styled-components for VS Code napovida

export const MainContainer = styled.div`
  position: relative;
  top: 10vh;
  margin: 0 auto;
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  width: 95%;
  border: 1px solid black;
`;
export const DiggersTab = styled.div`
  padding: 15px;
  width: 100%;
  min-height: 300px;
  background-color: beige;
`;
export const TasksTab = styled.div`
  padding: 15px;
  width: 100%;
  min-height: 300px;
  background-color: beige;
`;
export const DiggerListWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  *background: trasparent;
`;

export const Person = styled.div`
  border: 1px solid black;
  width: 95%;
  background-color: yellow;
  & button {
    width: 29px;
    height: 29px;
    font-size: 12px;
    background-color: red;
    cursor: pointer;
    margin-left: 20px;
  }
`;

export const Task = styled.div`
  border: 1px solid black;
  width: 95%;
  background-color: yellow;

  & button {
    width: 29px;
    height: 29px;
    font-size: 12px;
    background-color: red;
    cursor: pointer;
    margin-left: 20px;
  }
`;

export const PlanTasksButton = styled.button`
  width: auto;
  padding-left: 3px;
  padding-right: 3px;
  height: 30px;
  align-self: center;
  color: green;
`;

export const DiggerInputs = styled.div`
  display: flex;
  flex-direction: row;

  height: 30px;
  & input {
    display: inline-block;
    margin-right: 5px;
    width: 12rem;
    &[type="number"] {
      width: 3rem;
    }
  }
  & label {
    height: 30px;
    line-height: 30px;
    *vertical-align: middle;
    font-size: 12px;
    display: block;
    *padding-right: 5px;
    margin-right: 5px;
  }
  #gender {
    width: 6rem;
  }
`;

//// TLACITKA PRO TAB
export const TabNames = styled.div`
  margin: 0;
  *height: 40px;
  display: flex;
`;

export const TabButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: auto;
  border: 0px;
  border-right: 1px solid black;
  border-bottom: 0;
  padding: 5px;
  color: black;
  font-size: 15px;
  cursor: pointer;
  background-color: transparent;
  ${(props) => {
    if (props.name === props.activeTab) {
      return `background-color:beige;`;
    }
  }}
`;
