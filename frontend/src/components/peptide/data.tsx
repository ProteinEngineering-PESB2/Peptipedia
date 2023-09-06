
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json"
import PeptideSequence from "./sequence"
import DataTable from "../common/datatable";
import Box from "@mui/material/Box";
import ListItems from "./list_items";
import Structure from "./structure";
import Front from "./front";
interface Props{
    peptide_id: string;
}
export default function Data({peptide_id}: Props) {
    const [obj, setObj] = useState({})
    const [sequence, setSequence] = useState(undefined)
    const [is_canon, setIsCanon] = useState()
    const [activities, setActivities] = useState(undefined)
    const [id_activities, setIdActivities] = useState(undefined)
    const [sources, setSources] = useState(undefined)
    const [id_sources, setIdSources] = useState(undefined)
    const [swissprot_id, setSwissprotId] = useState(undefined)

    const [phy_table, setPhyTable] = useState(undefined)
    const [pfam_table, setPfamTable] = useState(undefined)
    const [go_table, setGOTable] = useState(undefined)

    const getSpecificPeptideData = async () => {
      try {
        const response = await axios.get(config.peptide.api + peptide_id);
        setSequence(response.data.results.peptide.sequence)
        setIsCanon(response.data.results.peptide.is_canon)
        setPhyTable(response.data.results.peptide.physicochemical_properties)
        setActivities(response.data.results.peptide.activities)
        setIdActivities(response.data.results.peptide.id_activities)
        setSources(response.data.results.peptide.sources)
        setIdSources(response.data.results.peptide.id_sources)
        setSwissprotId(response.data.results.peptide.swissprot_id)
        if (response.data.results.peptide.is_canon){
          setObj({
            "title": "Canon peptide: " + peptide_id
          })
        } else{
            setObj({
              "title": "Non-canon peptide: " + peptide_id
            })
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    const getEnrichment = async () =>{
      try {
        const response = await axios.get(config.peptide.enrichment_api + peptide_id);
        setPfamTable(response.data.results.pfam)
        setGOTable(response.data.results.go)
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      getSpecificPeptideData();
    }, []);
    useEffect(() => {
      if (is_canon){
        getEnrichment()
      }
    }, [is_canon])

    return (
      <>
        <Box sx={{ padding: 2 }}>
          <Front obj={obj}/>
        </Box>
        {(sequence) && (
          <Box sx={{ padding: 2 }}>
            <PeptideSequence sequence = {sequence}/>
          </Box>
        )}
        {(swissprot_id) && (
            <Box sx={{ padding: 2 }}>
              <Structure pdb_id={swissprot_id} ></Structure>
            </Box>
          )}
        {(activities) &&
          (<Box sx={{ padding: 2 }}>
            <ListItems activities={ activities } id_activities={id_activities}
            title={"Reported activities"}
            redirect={config.peptide.redirect_activities}/>
          </Box>)}
        {(sources) &&
          (<Box sx={{ padding: 2 }}>
            <ListItems activities={ sources } id_activities={id_sources}
            title={"References"}
            redirect={config.peptide.redirect_sources}/>
          </Box>)}
        {(phy_table) &&
          (<Box sx={{padding: 2}}>
            <DataTable title={"Physicochemical Properties"} table={phy_table}/>
          </Box>)}
        {(pfam_table) &&
          (<Box sx={{padding: 2, cursor: "pointer"}}>
            <DataTable title={"Pfam"} table={pfam_table}
            redirect_api={config.peptide.pfam_page}
            />
          </Box>)
        }
        {(go_table) &&
          (<Box sx={{padding: 2, cursor: "pointer"}}>
            <DataTable title={"Gene Ontology"} table={go_table}
            redirect_api={config.peptide.go_page}
            />
          </Box>)
        }
      </>
    )
  }