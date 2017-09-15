#!/usr/bin/env python3

from src import *


def main():
    cf_list = read_tsv('data/ytenx_canonical_forms.txt')[1:]
    cf_list = [item[2] for item in cf_list]

    regex_list = [
        row[:2]
        for row in read_tsv('data/rule_canonical_form_to_polyhedron.tsv')
        if len(row) >= 2
    ]

    cf2poly_transformer = RegexReplaceTransformer(regex_list)
    cf_poly_pair_list = [(cf, cf2poly_transformer(cf)) for cf in cf_list]
    save_tsv(cf_poly_pair_list,
             'data/lookup_table_canonical_form_polyhedron.tsv')


if __name__ == '__main__':
    main()
