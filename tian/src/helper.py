#!/usr/bin/env python3

import abc
from collections import namedtuple, OrderedDict
import json
import re

###############
# Transformer #
###############

TransformerResult = namedtuple('TransformerResult',
                               ['success', 'output', 'extra_info'])


class Transformer(metaclass=abc.ABCMeta):
    '''Abstrct class.

    Transformer is a thing that convert from one domain to another.
    '''

    @abc.abstractmethod
    def __call__(self, input):
        '''Transform the input to output.'''


class LookupTableBasedTransformer(Transformer):
    '''Lookup Table Based Transformer.
    '''

    def __init__(self, lookup_table):
        assert isinstance(lookup_table, dict)
        self._lookup_table = lookup_table

    @property
    def lookup_table(self):
        return self._lookup_table

    def __call__(self, input):
        return self.lookup_table.get(input, None)


class RegexReplaceTransformer(Transformer):
    '''Transformer that iteratively applies regex replacement.
    '''

    def __init__(self, regex_list):
        self._regex_list = regex_list  # list of [regex_pattern, str_replace]

    @property
    def regex_list(self):
        return self._regex_list

    def __call__(self, input, debug=False):
        x = input
        for pattern, replace in self.regex_list:
            y = re.sub(pattern, replace, x)
            if y != x:
                hit = True
                if debug:
                    print('pattern = %s replace = %s x = %s y = %s' % (pattern,replace, x,y))
                x = y
        return x


##################
# Data I/O utils #
##################


def maybe_fp(fp, mode='r'):
    if isinstance(fp, str):
        fp = open(fp, mode)
        fp.FROM_MAYBE = True
    return fp


def maybe_close(fp):
    if hasattr(fp, 'FROM_MAYBE'):
        fp.close()


def read_tsv(fp):
    fp = maybe_fp(fp)
    result = [line.strip('\r\n').split('\t') for line in fp]
    maybe_close(fp)
    return result


def save_tsv(tsv, fp):
    fp = maybe_fp(fp, mode='w')
    for row in tsv:
        print('\t'.join(row), file=fp)
    maybe_close(fp)


######################
# Lookup table utils #
######################


def tsv2lookup_table(tsv):
    return OrderedDict([tuple(row[:2]) for row in tsv if len(row) >= 2])


def lookup_table2tsv(lookup_table):
    return [list(row) for row in lookup_table.items()]


def load_lookup_table(fp):
    fp = maybe_fp(fp)
    tsv = read_tsv(fp)
    result = tsv2lookup_table(tsv)
    maybe_close(fp)
    return result


def save_lookup_table(lookup_table, fp):
    fp = maybe_fp(fp, mode='w')
    tsv = table2tsv(lookup_table)
    save_tsv(tsv, fp)
    maybe_close(fp)


def get_reverse_lookup_table(lookup_table):
    return {v: k for k, v in lookup_table.items()}
