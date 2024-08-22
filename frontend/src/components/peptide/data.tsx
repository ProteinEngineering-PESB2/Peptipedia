
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json"
import PeptideSequence from "./sequence"
import DataTable from "../common/datatable";
import Box from "@mui/material/Box";
import ListItems from "./list_items";
import Front from "./front";
import BackdropComponent from "../common/backdrop";
import { Grid, Typography, Container } from "@mui/material";
import Cite from "./cite";

interface Props{
    peptide_id?: string;
}
export default function Data({peptide_id}: Props) {
    const [obj, setObj] = useState({})
    const [sequence, setSequence] = useState(undefined)
    const [activities, setActivities] = useState(undefined)
    const [id_activities, setIdActivities] = useState([])
    const [sources, setSources] = useState(undefined)
    const [id_sources, setIdSources] = useState([])
    const [swissprot_id, setSwissprotId] = useState(undefined)
    const [keyword, setKeyword] = useState(undefined)
    const [pubmed, setPubmed] = useState(undefined)
    const [patent, setPatent] = useState(undefined)
    const [phy_table, setPhyTable] = useState(undefined)
    const [pfam_table, setPfamTable] = useState(undefined)
    const [go_table, setGOTable] = useState(undefined)
    const [is_waiting, setIsWaiting] = useState(false)

    const getSpecificPeptideData = async () => {
      try {
        setIsWaiting(true)
        const response = await axios.get(config.peptide.api + peptide_id);
        setSequence(response.data.results.peptide.sequence)
        setPhyTable(response.data.results.peptide.physicochemical_properties)
        setActivities(response.data.results.peptide.activities)
        setIdActivities(response.data.results.peptide.id_activities)
        setSources(response.data.results.peptide.sources)
        setIdSources(response.data.results.peptide.id_sources)
        setSwissprotId(response.data.results.peptide.swissprot_id)
        setKeyword(response.data.results.peptide.keyword)
        setPubmed(response.data.results.peptide.pubmed)
        setPfamTable(response.data.results.peptide.pfam)
        setGOTable(response.data.results.peptide.go)
        setPatent(response.data.results.peptide.patent)
        let title = "Peptide " + peptide_id
        if (swissprot_id){
          title = title + "-" + swissprot_id
        }
        if (response.data.results.peptide.is_canon){
          title = title + " | canonical"
        } else {
          title = title + " | non canonical"
        }
        setObj({
          "title": title
        })
        setIsWaiting(false)

      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {
      getSpecificPeptideData();
    }, []);
    useEffect(()=>{
      console.log(pubmed)
    }, [pubmed])

    return (
      <>
      <BackdropComponent open={is_waiting}/>
        <Box sx={{ padding: 2 }}>
          <Front obj={obj}/>
        </Box>
        {sequence && 
          <Box sx={{ padding: 2 }}>
            <PeptideSequence sequence = {sequence}/>
          </Box>
        }
        {patent &&
        <Box sx={{padding: 2, cursor: "pointer"}}>
          <Typography variant="subtitle1" sx={{ fontStyle: 'italic',
            textAlign: 'center'}}>
          Patent: {patent}
          </Typography>
        </Box>
          }
        {phy_table &&
          <Box sx={{padding: 2}}>
            <DataTable title={"Physicochemical Properties"} table={phy_table}/>
        </Box>}
        {keyword &&
        <Box sx={{padding: 2, cursor: "pointer"}}>
          <Typography variant="subtitle1" sx={{ fontStyle: 'italic',
            textAlign: 'center'}}>
          Activity keywords: {keyword}
          </Typography>
        </Box>
        }
        <Grid container>
          <Grid item xs={6}>
          {sources &&
            <Box sx={{ padding: 2 }}>
              <ListItems labels={ sources } ids={id_sources}
              title={"Sources"}
              redirect={config.peptide.redirect_sources}/>
            </Box>}
          </Grid>
          <Grid item xs={6}>
            {activities &&
            <Box sx={{ padding: 2 }}>
              <ListItems labels={ activities } ids={id_activities}
              title={"Reported activities"}
              redirect={config.peptide.redirect_activities}/>
            </Box>}
          </Grid>
        </Grid>
        {pfam_table &&
          <>
          <Container
          sx={{ textAlign: "center" }}
          maxWidth="lg"
          >
              <Typography variant="subtitle1" fontStyle="italic" marginTop={1}>
                  {config.peptide.go_description}
              </Typography>
          </Container>
          <Box sx={{padding: 2, cursor: "pointer"}}>
            <DataTable title={"Pfam"} table={pfam_table}
            redirect_api={config.peptide.pfam_page}
            do_navigate={false}
            />
          </Box>
          </>
        }
        {go_table &&
        <>
          <Container
          sx={{ textAlign: "center" }}
          maxWidth="lg"
          >
              <Typography variant="subtitle1" fontStyle="italic" marginTop={1}>
                  {config.peptide.go_description}
              </Typography>
          </Container>
          <Box sx={{padding: 2, cursor: "pointer"}}>
            <DataTable title={"Gene Ontology"} table={go_table}
            redirect_api={config.peptide.go_page}
            do_navigate={false}
            />
          </Box>
        </>
        }
        {pubmed &&
          <Box sx={{padding: 2, cursor: "pointer"}}>
            <Cite cite_data = {pubmed}></Cite>
          </Box>
        }
      </>
    )
  }