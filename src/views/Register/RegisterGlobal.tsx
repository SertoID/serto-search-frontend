import { Box } from "rimble-ui";
import { H2 } from "serto-ui";
import { Global, Viewport } from "../../components";

export const RegisterGlobal: React.FunctionComponent = (props) => {
  return (
    <Global banner searchBar>
      <Viewport>
        <Box pl={"136px"} pr={"132px"}>
          <H2 mb={0}>Get listed on Serto Search</H2>
          {props.children}
        </Box>
      </Viewport>
    </Global>
  );
};
