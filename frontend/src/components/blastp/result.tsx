import { useEffect, useState } from "react";
import PaginationComponent, {
  IPagination,
} from "./pagination";
import AlignmentSequenceCard, {
  AlignmentSequenceCardProps,
} from "./alignment_card";
import { Alignment } from "../../hooks/useProSeqViewer";
import CsvDownloadComponent from "./csv_download";
import { Box } from "@mui/material";

// Interfaces
interface AlignmentSequenceResultProps {
  results: AlignmentSequenceCardProps[];
}

interface ResultsDownload {
  id: string;
  bit_score: number;
  e_value: number;
  gaps: string;
  identity: string;
  length: number;
  similarity: string;
}

interface AlignmentsDownload {
  label: string;
  sequence: string;
}

interface ResultDownload {
  results: ResultsDownload[];
  alignments: AlignmentsDownload[];
  loading: boolean;
}

export default function AlignmentSequenceResult({ results }: AlignmentSequenceResultProps) {
  // States
  const [pagination, setPagination] = useState<IPagination>({
    from: 0,
    limit: 20,
  });
  const [resultsDownload, setResultsDownload] = useState<ResultDownload>({
    loading: true,
    results: [],
    alignments: [],
  });

  useEffect(() => {
    const parserResultsDownloads: ResultsDownload[] = [];
    const parserAlignmentsDownloads: AlignmentsDownload[] = [];

    results.map((result: AlignmentSequenceCardProps) => {
      parserResultsDownloads.push({
        id: result.id,
        bit_score: result.bit_score,
        e_value: result.e_value,
        gaps: result.gaps,
        identity: result.identity,
        length: result.length,
        similarity: result.similarity,
      });

      result.alignment.map((a: Alignment) => {
        parserAlignmentsDownloads.push({
          label: a.label,
          sequence: a.sequence,
        });
      });
    });

    setResultsDownload({
      loading: false,
      results: parserResultsDownloads,
      alignments: parserAlignmentsDownloads,
    });
  }, []);

  return (
    <Box m={2}>
      <Box m={2}>
        <h3>Found {results.length} hits.</h3>
      </Box>
      <PaginationComponent
        pagination={pagination}
        setPagination={setPagination}
        total={results.length}
        step={20}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        {results
          .slice(pagination.from, pagination.limit)
          .map((result: AlignmentSequenceCardProps, index: number) => (
            <AlignmentSequenceCard
              key={index}
              bit_score={result.bit_score}
              e_value={result.e_value}
              gaps={result.gaps}
              id={result.id}
              identity={result.identity}
              length={result.length}
              similarity={result.similarity}
              alignment={result.alignment}
              index={index}
            />
          ))}
      </div>
        <PaginationComponent
          pagination={pagination}
          setPagination={setPagination}
          total={results.length}
          step={20}
        />
    </Box>
  );
}