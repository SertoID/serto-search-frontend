import { SertoUiProvider, SertoUiContextInterface } from "serto-ui";

export interface SertoUiWrapperProps {
  renderContext: SertoUiContextInterface["renderContext"];
}

export const SertoUiWrapper: React.FunctionComponent<SertoUiWrapperProps> = (props) => {
  const sertoUiContext = {
    renderContext: props.renderContext,
  };

  return <SertoUiProvider context={sertoUiContext}>{props.children}</SertoUiProvider>;
};
