"use client"
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { Crismando } from "../types";
import { Caixinha } from "@/features/caixinha/types";
import LogoCrisma from "@/assets/logo-crisma.png";

type Frequencia = {
    id: string;
    crismandoId: string;
    status: 'P' | 'FJ' | 'FNJ';
    dataFrequencia: string;
    justificativa?: string;
};

type Props = {
    crismando: Crismando & {
        frequencias?: Frequencia[];
        caixinhas?: Caixinha[];
    };
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
        borderColor: "#0284c7",
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
        color: "#0284c7",
        marginTop: 2,
    },
    headerDate: {
        fontSize: 9,
        color: "#64748b",
        textAlign: "right",
    },
    
    // Card de Informações Pessoais
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

    // Resumo de Estatísticas
    metricsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 14,
        gap: 8,
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
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        color: "#475569",
        textTransform: "uppercase",
        marginBottom: 2,
    },
    metricValue: {
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
        color: "#0f172a",
    },
    metricValueGreen: {
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
        color: "#166534",
    },
    metricValueRed: {
        fontSize: 14,
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
    footerTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#e2e8f0',
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginTop: 2,
        borderRadius: 3,
    },
    footerTotalText: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: '#0f172a',
    }
});

function formatarDataBr(dataStr?: string) {
    if (!dataStr) return "-";
    const cleanDate = dataStr.split('T')[0];
    const parts = cleanDate.split('-');
    if (parts.length !== 3) return dataStr;
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
}

function formatarMoedaBr(valor: number) {
    return `R$ ${Number(valor || 0).toFixed(2).replace('.', ',')}`;
}

export function CrismandoRelatorioPDF({ crismando }: Props) {
    const dataEmissao = new Date().toLocaleDateString('pt-BR');
    
    // Faltas (FJ e FNJ)
    const faltas = crismando.frequencias?.filter(f => f.status === 'FJ' || f.status === 'FNJ') || [];
    const faltasJustificadas = faltas.filter(f => f.status === 'FJ').length;
    const faltasNaoJustificadas = faltas.filter(f => f.status === 'FNJ').length;

    // Caixinha
    const caixinhas = crismando.caixinhas || [];
    const totalCaixinha = caixinhas.reduce((acc, curr) => acc + Number(curr.valorPago || 0), 0);

    return (
        <Document>
            <Page style={styles.page}>
                {/* Cabeçalho */}
                <View style={styles.headerSection}>
                    <Image src={LogoCrisma.src} style={styles.headerLogo} />
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.mainTitle}>Pastoral de Crisma - Santuário Mãe Rainha</Text>
                        <Text style={styles.subtitle}>Ficha / Relatório do Crismando</Text>
                    </View>
                    <View>
                        <Text style={styles.headerDate}>Emitido em:</Text>
                        <Text style={[styles.headerDate, { fontFamily: 'Helvetica-Bold' }]}>{dataEmissao}</Text>
                    </View>
                </View>

                {/* Dados do Crismando */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Dados Pessoais e Cadastrais</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.infoItemFull}>
                            <Text style={styles.label}>Nome do Crismando:</Text>
                            <Text style={[styles.value, { fontFamily: 'Helvetica-Bold' }]}>{crismando.nomeCrismando}</Text>
                        </View>
                        <View style={styles.infoItemHalf}>
                            <Text style={styles.label}>Idade:</Text>
                            <Text style={styles.value}>{crismando.idade} anos</Text>
                        </View>
                        <View style={styles.infoItemHalf}>
                            <Text style={styles.label}>Data Nasc.:</Text>
                            <Text style={styles.value}>{formatarDataBr(crismando.dataNascimento)}</Text>
                        </View>
                        <View style={styles.infoItemHalf}>
                            <Text style={styles.label}>Telefone:</Text>
                            <Text style={styles.value}>{crismando.telefoneCrismando || "Não informado"}</Text>
                        </View>
                        <View style={styles.infoItemHalf}>
                            <Text style={styles.label}>E-mail:</Text>
                            <Text style={styles.value}>{crismando.email || "Não informado"}</Text>
                        </View>
                        <View style={styles.infoItemHalf}>
                            <Text style={styles.label}>Batizado:</Text>
                            <Text style={styles.value}>{crismando.batizado}</Text>
                        </View>
                        <View style={styles.infoItemHalf}>
                            <Text style={styles.label}>Primeira Eucaristia:</Text>
                            <Text style={styles.value}>{crismando.primeiraEucaristia}</Text>
                        </View>
                        <View style={styles.infoItemHalf}>
                            <Text style={styles.label}>Mãe:</Text>
                            <Text style={styles.value}>{crismando.nomeMae} - Tel: {crismando.telefoneMae || "Sem tel"}</Text>
                        </View>
                        {crismando.nomePai ? (
                            <View style={styles.infoItemHalf}>
                                <Text style={styles.label}>Pai:</Text>
                                <Text style={styles.value}>{crismando.nomePai} - Tel: {crismando.telefonePai || "Sem tel"}</Text>
                            </View>
                        ) : null}
                    </View>
                </View>

                {/* Cards de Resumo */}
                <View style={styles.metricsRow}>
                    <View style={styles.metricBoxRed}>
                        <Text style={styles.metricLabel}>Total de Faltas</Text>
                        <Text style={styles.metricValueRed}>{faltas.length}</Text>
                        <Text style={{ fontSize: 7, color: '#7f1d1d', marginTop: 1 }}>
                            ({faltasNaoJustificadas} N. Justificadas / {faltasJustificadas} Justificadas)
                        </Text>
                    </View>

                    <View style={styles.metricBoxGreen}>
                        <Text style={styles.metricLabel}>Total Pago em Caixinha</Text>
                        <Text style={styles.metricValueGreen}>{formatarMoedaBr(totalCaixinha)}</Text>
                        <Text style={{ fontSize: 7, color: '#14532d', marginTop: 1 }}>
                            ({caixinhas.length} lançamentos registrados)
                        </Text>
                    </View>
                </View>

                {/* Histórico de Faltas */}
                <View style={{ marginBottom: 14 }}>
                    <Text style={styles.sectionTitle}>Histórico de Faltas</Text>
                    
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, { width: '25%' }]}>Data</Text>
                        <Text style={[styles.tableHeaderCell, { width: '35%' }]}>Status</Text>
                        <Text style={[styles.tableHeaderCell, { width: '40%' }]}>Justificativa</Text>
                    </View>

                    {faltas.length === 0 ? (
                        <Text style={styles.emptyText}>Nenhuma falta registrada. Excelente assiduidade!</Text>
                    ) : (
                        faltas.map((falta, index) => (
                            <View style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt} key={falta.id || index}>
                                <Text style={[styles.tableCell, { width: '25%', fontFamily: 'Helvetica-Bold' }]}>
                                    {formatarDataBr(falta.dataFrequencia)}
                                </Text>
                                <View style={{ width: '35%' }}>
                                    <Text style={falta.status === 'FNJ' ? styles.badgeRed : styles.badgeYellow}>
                                        {falta.status === 'FNJ' ? 'Falta Não Justificada' : 'Falta Justificada'}
                                    </Text>
                                </View>
                                <Text style={[styles.tableCell, { width: '40%' }]}>
                                    {falta.justificativa || "-"}
                                </Text>
                            </View>
                        ))
                    )}
                </View>

                {/* Histórico de Pagamentos (Caixinha) */}
                <View style={{ marginBottom: 14 }}>
                    <Text style={styles.sectionTitle}>Histórico de Pagamentos (Caixinha)</Text>
                    
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, { width: '15%' }]}>#</Text>
                        <Text style={[styles.tableHeaderCell, { width: '50%' }]}>Data do Pagamento</Text>
                        <Text style={[styles.tableHeaderCell, { width: '35%', textAlign: 'right' }]}>Valor Pago</Text>
                    </View>

                    {caixinhas.length === 0 ? (
                        <Text style={styles.emptyText}>Nenhum pagamento de caixinha registrado para este crismando.</Text>
                    ) : (
                        caixinhas.map((item, index) => (
                            <View style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt} key={item.id || index}>
                                <Text style={[styles.tableCell, { width: '15%' }]}>#{index + 1}</Text>
                                <Text style={[styles.tableCell, { width: '50%' }]}>
                                    {formatarDataBr(item.dataPagamento)}
                                </Text>
                                <Text style={[styles.tableCell, { width: '35%', textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>
                                    {formatarMoedaBr(Number(item.valorPago))}
                                </Text>
                            </View>
                        ))
                    )}

                    {caixinhas.length > 0 ? (
                        <View style={styles.footerTotalRow}>
                            <Text style={styles.footerTotalText}>TOTAL PAGO ACUMULADO</Text>
                            <Text style={styles.footerTotalText}>{formatarMoedaBr(totalCaixinha)}</Text>
                        </View>
                    ) : null}
                </View>
            </Page>
        </Document>
    );
}
