"use client"
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer"
import { CrismandoComGrupo } from "../components"
import LogoCrisma from "@/assets/logo-crisma.png"

type Props = {
    crismandos: CrismandoComGrupo[];
    dataInicial: string;
    dataFinal: string;
}

const styles = StyleSheet.create({
    section: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1e293b",
        letterSpacing: 1,
        marginBottom: 8,
        textTransform: "uppercase"
    },
    subtitle: {
        fontSize: 13,
        color: "#475569",
        marginBottom: 4,
        letterSpacing: 0.8
    },
    totalText: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#0f172a"
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: '#f1f5f9',
        borderBottomWidth: 1,
        borderColor: '#cbd5e1',
        marginBottom: 4,
    },
    tableHeaderCell: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#334155'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderColor: '#e2e8f0',
    },
    colNome: {
        width: '45%',
        fontSize: 11,
        color: '#1e293b'
    },
    colGrupo: {
        width: '30%',
        fontSize: 11,
        color: '#475569'
    },
    colData: {
        width: '25%',
        fontSize: 11,
        color: '#0f172a',
        textAlign: 'right',
        fontWeight: 'bold'
    }
})

function formatarDataBr(dataStr: string) {
    if (!dataStr) return "-";
    const cleanDate = dataStr.split('T')[0];
    const parts = cleanDate.split('-');
    if (parts.length !== 3) return dataStr;
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
}

export function AniversariosRelatorioPDF({ crismandos, dataInicial, dataFinal }: Props) {
    const dataInicialBr = formatarDataBr(dataInicial);
    const dataFinalBr = formatarDataBr(dataFinal);

    return (
        <Document>
            <Page style={{ padding: 24 }}>
                <View style={styles.section}>
                    <Image src={LogoCrisma.src} style={{ width: 44, height: 44 }} />
                    <Text style={styles.title}>Pastoral de Crisma - Santuário Mãe Rainha</Text>
                    <Text style={styles.subtitle}>Relatório de Aniversariantes ({dataInicialBr} a {dataFinalBr})</Text>
                </View>

                <View style={{ marginTop: 16 }}>
                    <Text style={styles.totalText}>
                        Total de aniversariantes encontrados: {crismandos.length}
                    </Text>

                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, { width: '45%' }]}>Nome do Crismando</Text>
                        <Text style={[styles.tableHeaderCell, { width: '30%' }]}>Grupo</Text>
                        <Text style={[styles.tableHeaderCell, { width: '25%', textAlign: 'right' }]}>Aniversário</Text>
                    </View>

                    {crismandos.length === 0 ? (
                        <View style={{ padding: 12 }}>
                            <Text style={{ fontSize: 11, color: '#64748b', textAlign: 'center' }}>
                                Nenhum aniversariante encontrado neste período.
                            </Text>
                        </View>
                    ) : (
                        crismandos.map((crismando) => (
                            <View style={styles.row} key={crismando.id}>
                                <Text style={styles.colNome}>{crismando.nomeCrismando}</Text>
                                <Text style={styles.colGrupo}>{crismando.nomeGrupo || "Sem grupo"}</Text>
                                <Text style={styles.colData}>{formatarDataBr(crismando.dataNascimento)}</Text>
                            </View>
                        ))
                    )}
                </View>
            </Page>
        </Document>
    );
}
