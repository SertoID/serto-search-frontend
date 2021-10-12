import { Box } from "rimble-ui";
import { H2 } from "serto-ui";
import { Global, Viewport } from "../../components";

export const RegisterGlobal: React.FunctionComponent = (props) => {
  return (
    <Global banner searchBar>
      <Viewport>
        <Box>
          <H2>Get listed on Serto Search</H2>
          {props.children}
        </Box>
      </Viewport>
    </Global>
  );
};
