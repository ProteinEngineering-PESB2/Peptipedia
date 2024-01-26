# Peptipedia backend
## Install


### Create conda environment
```
conda create -n peptipedia_backend python=3.9
conda activate peptipedia_backend
```

### Install python requirements
```
pip install -r requirements.txt
```
### Install conda requirements
```
conda install bioconda::blast
```
### Set paths
```
export PYTHONPATH=.
```

### Set password

Set to peptipedia_db password

```
echo "password" > .env
```

## Usage
```
python peptipedia/main.py
```