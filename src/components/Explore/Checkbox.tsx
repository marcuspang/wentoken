import React from "react";
import { Box, Stack, Checkbox, CheckboxGroup } from "@chakra-ui/react";

const options = [
  {
    name: "Tradeable cards only",
    defaultCheckValue: false,
  },
  {
    name: "some other options like pnl",
    defaultCheckValue: false,
  },
];

function Checkboxcustom() {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <CheckboxGroup
        colorScheme="green"
        defaultValue={["Available for trade", "Unavailable for trade"]}
      >
        <Stack pl={6} mt={1} spacing={1}>
          <Box minW="8vw" alignSelf={"center"} fontSize={"xs"} pl={"10px"}>
            Filter By:
          </Box>
          <Box alignSelf={"center"}>
            <Checkbox
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={(e) =>
                setCheckedItems([e.target.checked, e.target.checked])
              }
            >
              Parent Checkbox
            </Checkbox>
            <Checkbox
              value="Available for trade"
              isChecked={checkedItems[0]}
              onChange={(e) =>
                setCheckedItems([e.target.checked, checkedItems[1]])
              }
            >
              Available for trade
            </Checkbox>
            <Checkbox
              value="Unavailable for trade"
              isChecked={checkedItems[1]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], e.target.checked])
              }
            >
              Unavailable for trade
            </Checkbox>
          </Box>
        </Stack>
      </CheckboxGroup>
    </>
  );
}

export default Checkboxcustom;
