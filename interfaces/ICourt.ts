export interface ICourt {
    resource_uri: string;
    id: string;
    pacer_court_id: number;
    pacer_has_rss_feed: boolean;
    pacer_rss_entry_types: string;
    date_last_pacer_contact: string;
    fjc_court_id: string;
    date_modified: string;
    in_use: boolean;
    has_opinion_scraper: boolean;
    has_oral_argument_scraper: boolean;
    position: number;
    citation_string: string;
    short_name: string;
    full_name: string;
    url: string;
    start_date: string;
    end_date: string;
    jurisdiction: string;
}
