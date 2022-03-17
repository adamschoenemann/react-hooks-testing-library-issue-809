import { renderHook, WrapperComponent } from "@testing-library/react-hooks";
import React from "react";

async function loadData() {}
const MyContext = React.createContext(undefined as unknown as any);

const MyProvider: React.FC = (props) => {
  const [state, setState] = React.useState({ foo: 0 });
  React.useEffect(() => {
    async function load() {
      await loadData();
      setState({ foo: 20 });
    }
    load();
  }, []);
  return (
    <MyContext.Provider value={state}>{props.children}</MyContext.Provider>
  );
};

function useExampleHook() {
  const state = React.useContext(MyContext);
  return { state };
}

describe("minimal example", () => {
  test("the example", async () => {
    const wrapper: WrapperComponent<{}> = ({ children }) => (
      <MyProvider>{children}</MyProvider>
    );
    const { result } = renderHook(() => useExampleHook(), {
      wrapper,
    });
    expect(result.current.state).toEqual({ foo: 0 });
  });
});
