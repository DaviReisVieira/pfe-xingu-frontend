enum BaseAplicacao {
    PRINCIPAL_BRUTO_DESCONTO_PREVIDENCIARIO = '(+) Principal Bruto (-) Desconto Previdenciário',
    JUROS_MORATORIOS = '(+) Juros Moratórios',
    NAO_APLICAVEL = 'Não Aplicável',
}
  
enum NaturezaCredor {
    PESSOA_FISICA = 'PESSOA_FISICA',
    PESSOA_JURIDICA = 'PESSOA_JURIDICA',
}

interface CredorData {
    requerente: string;
    natureza_credor: NaturezaCredor;
    data_nascimento: string;
    preferencia: string;
}

enum EntidadeDevedora {
    ESTADO = 'ESTADO',
    MUNICIPIO = 'MUNICIPIO',
}


interface ProcessoData {
    n_processo: string;
    n_incidente: number;
    data_aquisicao: string;
    percentual_aquisicao: number;
    percentual_honorarios: number;
    data_expedicao: string;
    entidade_devedora: EntidadeDevedora;
}

enum NaturezaCredito {
    SUCUMBENCIA = 'Sucumbência/Honorários Contratuais',
    COMUM = 'Comum/Outros',
}


interface CreditoData {
    principal_bruto: number;
    juros_moratorios: number;
    assistencia_medica: number;
    descontos_previdenciarios: number;
    data_base: string;
    natureza_credito: NaturezaCredito;
}

interface PreferenciaData {
    principal_bruto_preferencia: number;
    juros_moratorios_preferencia: number;
    assistencia_medica_preferencia: number;
    descontos_previdenciarios_preferencia: number;
    data_pmt_preferencia: string | null;
    estimativa_preferencia: number;
}

enum PreferenciaDataEnum {
    principal_bruto_preferencia = 'principal_bruto_preferencia',
    juros_moratorios_preferencia = 'juros_moratorios_preferencia',
    assistencia_medica_preferencia = 'assistencia_medica_preferencia',
    descontos_previdenciarios_preferencia = 'descontos_previdenciarios_preferencia',
}

interface CalculoData {
    data_termo_inicial: string;
    data_termo_final: string;
}

interface RoleProps {
    id: number;
    name: 'ADMIN' | 'USER';

}

interface AccessTokenProps {
    cpf: string;
    first_name: string;
    last_name: string;
    role: RoleProps;
}

interface DetalhesPrecatorioProps {
    id: string;
}

interface AuthProviderProps {
    children: ReactChild;
}

interface MenuBoxProps {
    user: User;
    currentPage: string;
    logOut: () => Promise<void>;
}

interface PrecatorioAtualizado {
    id: string,
    data_inicio_graca: string,
    data_fim_graca: string,
    principal_bruto_atualizado: number,
    juros_moratorios_atualizado: number,
    juros_de_mora: number,
    assistencia_medica_atualizado: number,
    descontos_previdenciarios_atualizado: number,
    base_aplicacao: BaseAplicacao,
    descontos_ir: number,
    descontos_honorarios: number,
    total_atualizado: number,
    percentual_proposto: number,
    valor_proposto: number,
    precatorio: CredorData & ProcessoData & CreditoData & PreferenciaData & CalculoData

}

interface DocumentProps {
    id: string;
    title: string;
    description: string;
    type: string;
    url: string;
}