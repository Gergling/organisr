import { Accordion, AccordionSummary } from "@mui/material";
import { HourglassBottom } from "../../../shared/icons";

export const TransactionFileLoading = ({ fileName }: { fileName: string }) => (
  <Accordion disabled>
    <AccordionSummary>
      <HourglassBottom /> {fileName}
    </AccordionSummary>
  </Accordion>
);
