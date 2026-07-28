"use client"
import {Document, Page, Text, View, Image, StyleSheet} from "@react-pdf/renderer"
import { Grupo } from "../types"
import LogoCrisma from "@/assets/logo-crisma.png";

type Props = {
    grupo: Grupo;
}

const styles = StyleSheet.create({
    section:{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    title:{
        fontSize: 16,
        fontWeight: "bold",
        color: "#1e293b",
        letterSpacing: 1,
        marginBottom: 12,
        textTransform: "uppercase"
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "semibold",
        color: "#475569",
        marginBottom: 4,
        letterSpacing: 0.8
    },
    totalCrismandoText: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 10,
    },
    crismandoInfoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingVertical: 4,
        borderBottomWidth: 1,
    },
    crismandoInfoText:{
     fontSize: 12,
    },
    totalText: {
        fontSize: 12,
        fontWeight: "bold",
        border: 2,
        borderColor: "red"
    }
})

export function GrupoRelatorioPDF({grupo} : Props){
    return(
        <Document>
            <Page style={{padding: 12}}>
                <View style={styles.section}>
                    <Image src={LogoCrisma.src} style={{width: 40, height: 40}} />
                    <Text style={styles.title}>Pastoral de Crisma - Santuário Mãe Rainha</Text>
                    <Text style={styles.subtitle}>Relatório do grupo: {grupo.nomeGrupo}</Text>
                </View>
                <View style={{marginTop: 12, flexDirection: 'column', gap: 10}}>
                    <Text style={styles.totalCrismandoText}>
                        Total de crismandos: {grupo.crismandos.length}
                    </Text>
                    {grupo.crismandos.map(crismando => {
                        const numeroFaltasCrismando = crismando.frequencias?.filter(freq => freq.status !== "P" ).length || 0;
                        return(
                            <View style={styles.crismandoInfoView} key={crismando.id}>
                                <Text style={styles.crismandoInfoText}>{crismando.nomeCrismando}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                                    <Text style={styles.crismandoInfoText}>Faltas: {numeroFaltasCrismando}</Text>
                                    <Text style={styles.crismandoInfoText}>Batizado: {crismando.batizado}</Text>
                                    <Text style={styles.crismandoInfoText}>1a Eucaristia: {crismando.primeiraEucaristia}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </Page>
        </Document>
    )
}