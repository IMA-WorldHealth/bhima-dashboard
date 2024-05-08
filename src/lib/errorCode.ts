/* eslint-disable @typescript-eslint/no-explicit-any */
const errorCode: any = {
  22007: 'Vous avez inserer un format date non accepté',
  23505: 'Vous avez essayé d‘enregistrer un élement qui existe déjà, vérifier vos champs',
  23502: 'Vous avez essayé d‘enregistrer un élement qui est null, vérifier vos champs',
  42000: 'syntax_error_or_access_rule_violation',
  42601: 'Erreur de syntaxe',
  42501: 'insufficient_privilege',
  42846: 'cannot_coerce',
  42803: 'grouping_error',
  '42P20': 'windowing_error',
  '42P19': 'invalid_recursion',
  42830: 'invalid_foreign_key',
  42602: 'invalid_name',
  42622: 'Une de vos valeurs de formulaire est trop longue! Veuillez le raccourcir et le renvoyer.',
  42939: 'reserved_name',
  42804: 'Mauvais format de données',
  '42P18': 'indeterminate_datatype',
  '42P21': 'collation_mismatch',
  '42P22': 'ndeterminate_collation',
  42809: 'Mauvais format de données pour cet object',
  '428C9': 'generated_always',
  42703: 'La colonne n‘est pas defini',
  42883: 'undefined_function',
  '42P01': 'La table n‘est pas défini',
  '42P02': 'undefined_parameter',
  42704: 'undefined_object',
  42701: 'Vous avez dupliqué une valeur dans un champ unique! Assurez-vous que les valeurs nécessaires sont uniques.',
  '42P03':
    'Il ya déjà un enregistrement avec cette clé. Veuillez réessayer votre action. Si le problème persiste, contactez les développeurs.',
  '42P04':
    'Il ya déjà un enregistrement avec cette clé. Veuillez réessayer votre action. Si le problème persiste, contactez les développeurs.',
  42723: 'Vous avez dupliqué une valeur dans un champ unique! Assurez-vous que les valeurs nécessaires sont uniques.',
  '42P05':
    'Il ya déjà un enregistrement avec cette clé. Veuillez réessayer votre action. Si le problème persiste, contactez les développeurs.',
  '42P06':
    'Il ya déjà un enregistrement avec cette clé. Veuillez réessayer votre action. Si le problème persiste, contactez les développeurs.',
  '42P07':
    'Il ya déjà un enregistrement avec cette clé. Veuillez réessayer votre action. Si le problème persiste, contactez les développeurs.',
  42712:
    'Il ya déjà un enregistrement avec cette clé. Veuillez réessayer votre action. Si le problème persiste, contactez les développeurs.',
  42710:
    'Il ya déjà un enregistrement avec cette clé. Veuillez réessayer votre action. Si le problème persiste, contactez les développeurs.',
  42702: 'ambiguous_column',
  42725: 'ambiguous_function',
  '42P08': 'ambiguous_parameter',
  '42P09': 'ambiguous_alias',
  '42P10': 'invalid_column_reference',
  42611: 'invalid_column_definition',
  '42P11': 'invalid_cursor_definition',
  '42P12': 'invalid_database_definition',
  '42P13': 'invalid_function_definition',
  '42P14': 'invalid_prepared_statement_definition',
  '42P15': 'invalid_schema_definition',
  '42P16': 'invalid_table_definition',
  '42P17': 'invalid_object_definition',
  '720x': 'Vous n‘etes pas authorisé à faire cette opération',
  BAD_REQUEST: "Vous n'etes pas authorisé à faire cette opération",
  ERR_INTERNET_DISCONNECTED: "Vous n'êtes pas connecté à un réseau.",
  UNAUTHORIZED: 'Vous avez soumis un mauvais nom ou mot de passe.  Entrez un nom ou un mot de passe valide pour continuer.',
  APPROUVED_INFO: "Vous avez deja donnée votre avis, impossible de l'ajouter a nouveau soit modifer le",
  ERR_NETWORK: "Vous n'etes pas connecté à un réseau",
  ERROR_CONTENT_EXIST: "Vous avez essayé d'enregistre un element qui existe déjà",
  ELEMENT_NO_APPROUVED: "Impossible de valider cette information car il n'a pas été approuvé plus de trois fois",
  BAD_PASSWORD_FORCE: 'Votre mot de passe est incorrect',
  MOBILISATION_IMPORT_ERROR_BAD_MONTANT_DECAISSE_VALUE:
    'Vous avez saisi un mauvais format de donnée attendu sur la colonne montant decaissé',
  ERROR_TRIMESTRE_BAD: 'Vous avez saisi un mauvais format du donnée attendu sur la colonne Trimestre',
  ERRORS_CHAPITRES_REQUIRED:
    'impossible de valider ce projet car les chapitres sont vides \n veuillez le compléter puis essaie à nouveau',
  ERRORS_PROVINCE_REQUIRED:
    'Impossible de valider ce projet car les provinces sont vides \n veuillez le compléter puis essaie à nouveau',
  ERROR_FILE_IMPORT:
    'Nous avons detecté une erreur dans votre fichier, veuillez verifier les entetes du fichier tel que decrit ci-haut',
  ENTREPRISE_LIMIT: "Vous ne pouvez plus de creer plus de deux entreprises contactcer l'administrateur",
  FORBIDDEN: 'Vous ne pouvez plus acceder à cette resource, votre session a expiré',
};

export default errorCode;
