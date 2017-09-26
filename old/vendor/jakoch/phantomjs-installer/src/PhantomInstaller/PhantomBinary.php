<?php

namespace PhantomInstaller;

class PhantomBinary
{
    const BIN = '/Users/cornerbodega/Dropbox/webstar/wa/bin/phantomjs';
    const DIR = '/Users/cornerbodega/Dropbox/webstar/wa/bin';

    public static function getBin() {
        return self::BIN;
    }

    public static function getDir() {
        return self::DIR;
    }
}
