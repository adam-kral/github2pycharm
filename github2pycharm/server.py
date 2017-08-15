import os
import subprocess

from flask import Flask, request

from . import settings


class BadConfigError(Exception):
    pass


class PycharmProject:
    def __init__(self, config):
        if isinstance(config, str):
            project_root = config
            repository_root = config
        elif isinstance(config, dict):
            project_root = config['project_root']
            repository_root = config['repository_root']
        else:
            raise BadConfigError('Bad Config')

        self.project_root = os.path.abspath(project_root)
        self.repository_root = os.path.abspath(repository_root)

    def open(self, file_path, line_number):
        file_path = os.path.normpath(os.path.join(self.repository_root, *file_path.split('/')))  # let os.path.join choose separators

        if os.path.commonprefix([self.repository_root, file_path]) == self.repository_root:  # check that file within repository
            subprocess.run([settings.PYCHARM_EXECUTABLE, self.project_root, '--line', line_number, file_path])


pycharm_projects = {repo_name: PycharmProject(config) for repo_name, config in settings.REPOSITORIES.items()}

app = Flask(__name__)


@app.route('/', methods=['POST'])
def index():
    data = request.get_json()

    try:
        project = pycharm_projects[data['repositoryName']]
    except KeyError:
        return 'repository not configured, check settings', 404

    project.open(data['filePath'], data['lineNumber'])

    return ''
