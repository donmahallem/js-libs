from __future__ import print_function
from __future__ import division
import cv2 as cv
import numpy as np
import argparse
import os
def loadExposureSeq(path):
    images = []
    times = []
    with open(os.path.join(path, 'list.txt')) as f:
        content = f.readlines()
    for line in content:
        tokens = line.split()
        images.append(cv.imread(os.path.join(path, tokens[0])))
        times.append(1 / float(tokens[1]))
    return images, np.asarray(times, dtype=np.float32)

def merger():
    parser = argparse.ArgumentParser(description='Code for High Dynamic Range Imaging tutorial.')
    parser.add_argument('--input', type=str, help='Path to the directory that contains images and exposure times.')
    args = parser.parse_args()
    if not args.input:
        parser.print_help()
        exit(0)
    images, times = loadExposureSeq(args.input)
    calibrate = cv.createCalibrateDebevec()
    response = calibrate.process(images, times)
    merge_debevec = cv.createMergeDebevec()
    hdr = merge_debevec.process(images, times, response)
    tonemap = cv.createTonemap(2.2)
    ldr = tonemap.process(hdr)
    merge_mertens = cv.createMergeMertens()
    fusion = merge_mertens.process(images)
    cv.imwrite('fusion.png', fusion * 255)
    cv.imwrite('ldr.png', ldr * 255)
    cv.imwrite('hdr.hdr', hdr)

import os
import rawpy
from PIL import Image, ExifTags
for root, dirs, files in os.walk("I:/New"):
    for filename in files:
        source = root+"/"+filename
        f, e = os.path.splitext(source)
        print(source)
        outfile = f + ".jpg"
        if source != outfile:
            try:
                raw2 = Image.open(source)
                img_exif = raw2.getexif()
                if img_exif:
                    for key, val in img_exif.items():
                        if key in ExifTags.TAGS:
                            print(f'{ExifTags.TAGS[key]}:{val}')
                raw = rawpy.imread(source)
                rgb = raw.postprocess()
                img = Image.fromarray(rgb)
                img.save(outfile)
            except OSError:
                print("cannot convert", source)