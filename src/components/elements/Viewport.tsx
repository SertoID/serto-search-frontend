import { Box } from "rimble-ui";

export interface ViewportProps {
  fullBgColor?: string;
  fullBorderBottom?: string | number;
  fullBorderTop?: string | number;
  innerBgColor?: string;
  innerBorderBottom?: string | number;
  innerBorderTop?: string | number;
  mb?: string | number;
  mt?: string | number;
}

export const Viewport: React.FunctionComponent<ViewportProps> = (props) => {
  return (
    <Box
      bg={props.fullBgColor}
      borderBottom={props.fullBorderBottom}
      borderTop={props.fullBorderTop}
      mb={props.mb}
      mt={props.mt}
      width="100%"
    >
      <Box
        bg={props.innerBgColor}
        borderBottom={props.innerBorderBottom}
        borderTop={props.innerBorderTop}
        mx="auto"
        maxWidth="1440px"
        px={[3, 4]}
        width="100%"
      >
        {props.children}
      </Box>
    </Box>
  );
};
