import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
  ClickDark: () => void;
  isDark: boolean;
}

function Router({ ClickDark, isDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin isDark={isDark} />
        </Route>
        <Route path="/">
          <Coins isDark={isDark} ClickDark={ClickDark} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
