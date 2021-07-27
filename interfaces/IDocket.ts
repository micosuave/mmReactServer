export interface IDocket   {
    'resource_uri': string;
    'id': number;
    'court': string;
    'original_court_info': string;
    'idb_data': string;
    'clusters': Array<string>;
    'audio_files': Array<string>;
    'assigned_to': string;
    'referred_to': string;
    'absolute_url': string;
    'source': number;
    'appeal_from_str': string;
    'assigned_to_str': string;
    'referred_to_str': string;
    'panel_str': string;
    'date_created': string;
    'date_modified': string;
    'date_last_index': string;
    'date_cert_granted': string;
    'date_cert_denied': string;
    'date_argued': string;
    'date_reargued': string;
    'date_reargument_denied': string;
    'date_filed': string;
    'date_terminated': string;
    'date_last_filing': string;
    'case_name_short': string;
    'case_name': string;
    'case_name_full': string;
    'slug': string;
    'docket_number': string;
    'docket_number_core': string;
    'pacer_case_id': string;
    'cause': string;
    'nature_of_suit': string;
    'jury_demand': string;
    'jurisdiction_type': string;
    'appellate_fee_status': string;
    'appellate_case_type_information': string;
    'mdl_status': string;
    'filepath_ia': string;
    'filepath_ia_json': string;
    'ia_upload_failure_count': number;
    'ia_needs_upload': boolean;
    'ia_date_first_change': string;
    'date_blocked': string;
    'blocked': true;
    'appeal_from': string;
    'tags': [];
    'panel': [];
  }
