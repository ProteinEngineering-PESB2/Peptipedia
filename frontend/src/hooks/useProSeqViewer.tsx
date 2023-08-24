import { ProSeqViewer } from "proseqviewer/dist";
import { useEffect } from "react";

export interface Alignment {
  id: number;
  label: string;
  sequence: string;
  startIndex: number;
}

interface useProSeqViewerProps {
  alignments: Alignment[];
  divId: string;
  sequenceColor: string;
}

function useProSeqViewer({
  alignments,
  divId,
  sequenceColor,
}: useProSeqViewerProps) {
  const options = {
    wrapLine: false,
    indexesLocation: "lateral",
    sequenceColor,
  };

  useEffect(() => {
    const psv = new ProSeqViewer(divId);
    psv.draw({ sequences: alignments, options });
  }, []);

  return {};
}

export default useProSeqViewer;