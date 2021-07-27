import { IRECAPDocument } from './IRECAPDocument';

export interface IDocketEntry {
      'resource_uri': string;
      'id': number;
      'docket': string;
      'recap_documents': IRECAPDocument[];
      'date_created': string;
      'date_modified': string;
      'date_filed': string;
      'entry_number': number;
      'recap_sequence_number': string;
      'pacer_sequence_number': string;
      'description': string;
      'tags': [];
    }
