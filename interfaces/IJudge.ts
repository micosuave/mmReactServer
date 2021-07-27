export interface IJudgeSource {
  'resource_uri': string;
  'id': number;
  'person': string;
  'date_created': string;
  'date_modified': string;
  'url': string;
  'date_accessed': string;
  'notes': string;
}

export interface IJudge {
  'resource_uri': string;
  'id': number;
  'race': string[];
  'sources': IJudgeSource[];
  'aba_ratings': string[];
  'educations': string[];
  'positions': string[];
  'political_affiliations': string[];
  'is_alias_of': string | null;
  'date_created': string;
  'date_modified': string;
  'date_completed': string | null;
  'fjc_id': string | null;
  'cl_id': string;
  'slug': string;
  'name_first': string;
  'name_middle': string;
  'name_last': string;
  'name_suffix': string;
  'date_dob': string | null;
  'date_granularity_dob': string;
  'date_dod': string | null;
  'date_granularity_dod': string;
  'dob_city': string;
  'dob_state': string;
  'dob_country': string;
  'dod_city': string;
  'dod_state': string;
  'dod_country': string;
  'gender': string;
  'religion': string;
  'ftm_total_received': string | null;
  'ftm_eid': string | null;
  'has_photo': boolean;
}
