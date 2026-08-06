"use client"
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { Animador } from "../types";
import LogoCrisma from "@/assets/logo-crisma.png";
import { formatCargo } from "../components/animadores-lista";

type Props = {
    animador: Animador;
};

const styles = StyleSheet.create({
    page: {
        padding: 28,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
    },
    headerSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderColor: "#b91c1c",
        paddingBottom: 12,
        marginBottom: 16,
    },
    headerLogo: {
        width: 46,
        height: 46,
    },
    headerTitleContainer: {
        flexDirection: "column",
        marginLeft: 12,
        flex: 1,
    },
    mainTitle: {
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
        color: "#0f172a",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: "#b91c1c",
        marginTop: 2,
    },
    headerDate: {
        fontSize: 9,
        color: "#64748b",
        textAlign: "right",
    },

    // Card de Informações
    card: {
        backgroundColor: "#f8fafc",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 6,
        padding: 10,
        marginBottom: 14,
    },
    cardTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: "#1e293b",
        marginBottom: 6,
        borderBottomWidth: 1,
        borderColor: "#cbd5e1",
        paddingBottom: 4,
        textTransform: "uppercase",
    },
    infoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    infoItemHalf: {
        width: "50%",
        marginBottom: 4,
        flexDirection: "row",
    },
    infoItemFull: {
        width: "100%",
        marginBottom: 4,
        flexDirection: "row",
    },
    label: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        color: "#475569",
        marginRight: 4,
    },
    value: {
        fontSize: 9,
        color: "#0f172a",
    },

    // Resumo de Estatísticas / Métricas
    metricsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 14,
        gap: 6,
    },
    metricBox: {
        flex: 1,
        backgroundColor: "#f1f5f9",
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 6,
        padding: 8,
        alignItems: "center",
    },
    metricBoxGreen: {
        flex: 1,
        backgroundColor: "#f0fdf4",
        borderWidth: 1,
        borderColor: "#bbf7d0",
        borderRadius: 6,
        padding: 8,
        alignItems: "center",
    },
    metricBoxYellow: {
        flex: 1,
        backgroundColor: "#fefce8",
        borderWidth: 1,
        borderColor: "#fef08a",
        borderRadius: 6,
        padding: 8,
        alignItems: "center",
    },
    metricBoxRed: {
        flex: 1,
        backgroundColor: "#fef2f2",
        borderWidth: 1,
        borderColor: "#fecaca",
        borderRadius: 6,
        padding: 8,
        alignItems: "center",
    },
    metricLabel: {
        fontSize: 7.5,
        fontFamily: 'Helvetica-Bold',
        color: "#475569",
        textTransform: "uppercase",
        marginBottom: 2,
    },
    metricValue: {
        fontSize: 13,
        fontFamily: 'Helvetica-Bold',
        color: "#0f172a",
    },
    metricValueGreen: {
        fontSize: 13,
        fontFamily: 'Helvetica-Bold',
        color: "#166534",
    },
    metricValueYellow: {
        fontSize: 13,
        fontFamily: 'Helvetica-Bold',
        color: "#854d0e",
    },
    metricValueRed: {
        fontSize: 13,
        fontFamily: 'Helvetica-Bold',
        color: "#991b1b",
    },

    // Seção de Tabelas
    sectionTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: "#0f172a",
        marginBottom: 6,
        textTransform: "uppercase",
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#0f172a',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 3,
        marginBottom: 2,
    },
    tableHeaderCell: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        color: '#ffffff',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#e2e8f0',
    },
    tableRowAlt: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#e2e8f0',
        backgroundColor: '#f8fafc',
    },
    tableCell: {
        fontSize: 9,
        color: '#334155',
    },
    badgeGreen: {
        backgroundColor: '#dcfce7',
        color: '#166534',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
    },
    badgeRed: {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
    },
    badgeYellow: {
        backgroundColor: '#fef3c7',
        color: '#92400e',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
    },
    emptyText: {
        fontSize: 9,
        color: '#64748b',
        fontStyle: 'italic',
        padding: 8,
        textAlign: 'center',
    },
});

function formatarDataBr(dataStr?: string) {
    if (!dataStr) return "-";
    const cleanDate = dataStr.split('T')[0];
    const parts = cleanDate.split('-');
    if (parts.length !== 3) return dataStr;
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
}

export function AnimadorRelatorioPDF({ animador }: Props) {
    const dataEmissao = new Date().toLocaleDateString('pt-BR');
    const frequencias = animador.frequencias || [];

    const presencas = frequencias.filter(f => f.status === 'P').length;
    const faltasJustificadas = frequencias.filter(f => f.status === 'FJ').length;
    const faltasNaoJustificadas = frequencias.filter(f => f.status === 'FNJ').length;
    const totalRegistros = frequencias.length;

    const taxaPresenca = totalRegistros > 0
        ? ((presencas / totalRegistros) * 100).toFixed(0) + '%'
        : '100%';

    return (
        <Document>
            <Page style={styles.page}>
                {/* Cabeçalho */}
                <View style={styles.headerSection}>
                    <Image src={LogoCrisma.src} style={styles.headerLogo} />
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.mainTitle}>Pastoral de Crisma - Santuário Mãe Rainha</Text>
                        <Text style={styles.subtitle}>Ficha / Relatório do Animador</Text>
                    </View>
                    <View>
                        <Text style={styles.headerDate}>Emitido em:</Text>
                        <Text style={[styles.headerDate, { fontFamily: 'Helvetica-Bold' }]}>{dataEmissao}</Text>
                    </View>
                </View>

                {/* Dados do Animador */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Dados Pessoais e Cadastrais</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.infoItemFull}>
                            <Text style={styles.label}>Nome do Animador:</Text>
                            <Text style={[styles.value, { fontFamily: 'Helvetica-Bold' }]}>{animador.nomeAnimador}</Text>
                        </View>
                        <View style={styles.infoItemHalf}>
                            <Text style={styles.label}>Cargo / Ministério:</Text>
                            <Text style={styles.value}>{formatCargo(animador.cargo)}</Text>
                        </View>
                        <View style={styles.infoItemHalf}>
                            <Text style={styles.label}>Data Nasc.:</Text>
                            <Text style={styles.value}>{formatarDataBr(animador.dataNascimento)}</Text>
                        </View>
                        <View style={styles.infoItemHalf}>
                            <Text style={styles.label}>Grupo Crismando:</Text>
                            <Text style={styles.value}>{animador.grupoCrismando?.nomeGrupo || "Sem grupo associado"}</Text>
                        </View>
                        <View style={styles.infoItemHalf}>
                            <Text style={styles.label}>Usuário Vinculado:</Text>
                            <Text style={styles.value}>{animador.usuario ? `${animador.usuario.nome} (${animador.usuario.email})` : "Nenhum usuário vinculado"}</Text>
                        </View>
                    </View>
                </View>

                {/* Resumo de Métricas */}
                <View style={styles.metricsRow}>
                    <View style={styles.metricBox}>
                        <Text style={styles.metricLabel}>Total Registros</Text>
                        <Text style={styles.metricValue}>{totalRegistros}</Text>
                    </View>

                    <View style={styles.metricBoxGreen}>
                        <Text style={styles.metricLabel}>Presenças</Text>
                        <Text style={styles.metricValueGreen}>{presencas}</Text>
                        <Text style={{ fontSize: 7, color: '#14532d', marginTop: 1 }}>Taxa: {taxaPresenca}</Text>
                    </View>

                    <View style={styles.metricBoxYellow}>
                        <Text style={styles.metricLabel}>Faltas Justificadas</Text>
                        <Text style={styles.metricValueYellow}>{faltasJustificadas}</Text>
                    </View>

                    <View style={styles.metricBoxRed}>
                        <Text style={styles.metricLabel}>Faltas N. Justificadas</Text>
                        <Text style={styles.metricValueRed}>{faltasNaoJustificadas}</Text>
                    </View>
                </View>

                {/* Histórico de Frequência */}
                <View style={{ marginBottom: 14 }}>
                    <Text style={styles.sectionTitle}>Histórico de Frequência do Animador</Text>

                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Data</Text>
                        <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Tipo</Text>
                        <Text style={[styles.tableHeaderCell, { width: '25%' }]}>Status</Text>
                        <Text style={[styles.tableHeaderCell, { width: '35%' }]}>Justificativa</Text>
                    </View>

                    {frequencias.length === 0 ? (
                        <Text style={styles.emptyText}>Nenhum registro de frequência encontrado para este animador.</Text>
                    ) : (
                        frequencias.map((f, index) => {
                            const tipoStr = f.tipo === "FORMACAO" ? "Formação" : "Encontro";
                            return (
                                <View style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt} key={f.id || index}>
                                    <Text style={[styles.tableCell, { width: '20%', fontFamily: 'Helvetica-Bold' }]}>
                                        {formatarDataBr(f.dataFrequencia)}
                                    </Text>
                                    <Text style={[styles.tableCell, { width: '20%' }]}>
                                        {tipoStr}
                                    </Text>
                                    <View style={{ width: '25%' }}>
                                        {f.status === 'P' && (
                                            <Text style={styles.badgeGreen}>Presente</Text>
                                        )}
                                        {f.status === 'FJ' && (
                                            <Text style={styles.badgeYellow}>Falta Justificada</Text>
                                        )}
                                        {f.status === 'FNJ' && (
                                            <Text style={styles.badgeRed}>Falta N. Justificada</Text>
                                        )}
                                    </View>
                                    <Text style={[styles.tableCell, { width: '35%' }]}>
                                        {f.justificativa || "-"}
                                    </Text>
                                </View>
                            );
                        })
                    )}
                </View>
            </Page>
        </Document>
    );
}
