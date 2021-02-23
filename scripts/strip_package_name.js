const items = process.argv[2].split("@");
const packagename = items.slice(0, items.length - 1).join("@");
process.stdout.write('::set-output name=PACKAGE_NAME::' + packagename);
process.stdout.write('\n');
process.stdout.write('::set-output name=PACKAGE_NAME_SUFFIX::' + packagename.split("/")[1]);
