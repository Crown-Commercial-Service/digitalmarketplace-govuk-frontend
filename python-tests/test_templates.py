from pathlib import Path
from typing import Iterable
from unittest import mock

import jinja2
import pytest

root_path = Path(__file__, "..", "..").resolve()
src_path = root_path / "src"


def find_njk_templates(path: Path) -> Iterable[Path]:
    """Walk a directory tree looking for njk files"""
    if path.is_dir():
        for child in path.iterdir():
            yield from find_njk_templates(child)
    elif path.is_file():
        if path.suffix == ".njk":
            yield path


digitalmarketplace_templates = tuple(list(find_njk_templates(src_path / "digitalmarketplace")))


@pytest.fixture
def env():
    class GOVUKFrontendJinjaLoader(jinja2.PackageLoader):
        # work around the fact the filenames are different in govuk_frontend_jinja
        def get_source(self, environment, template):
            if template.endswith(".njk"):
                template = template[:-4] + ".html"
            return super().get_source(environment, template)

    loader = jinja2.PrefixLoader({
        "digitalmarketplace": jinja2.FileSystemLoader(src_path / "digitalmarketplace"),
        "govuk": GOVUKFrontendJinjaLoader("govuk_frontend_jinja"),
        "govuk_frontend_jinja": jinja2.PackageLoader("govuk_frontend_jinja"),
    })

    env = jinja2.Environment(loader=loader)
    env.globals["url_for"] = mock.Mock(return_value="#")
    return env


class MockParams(mock.MagicMock):
    def __repr__(self):
        # make sure the str is deterministic
        _name_list = [self._mock_new_name]
        _parent = self._mock_new_parent
        last = self

        dot = "."
        if _name_list == ["()"]:
            dot = ""
        seen = set()
        while _parent is not None:
            last = _parent

            _name_list.append(_parent._mock_new_name + dot)
            dot = "."
            if _parent._mock_new_name == "()":
                dot = ""

            _parent = _parent._mock_new_parent

            if id(_parent) in seen:
                break
            seen.add(id(_parent))

        _name_list = list(reversed(_name_list))
        _first = last._mock_name or "params"
        if len(_name_list) > 1:
            if _name_list[1] not in ("()", "()."):
                _first += "."
        _name_list[0] = _first
        name = "".join(_name_list)

        return f"<MockParam {name}>"

    def _get_child_mock(self, **kw):
        return MockParams(**kw)


@pytest.fixture
def params():
    return MockParams()


@pytest.fixture(params=digitalmarketplace_templates)
def template_path(request):
    template_path = str(request.param.relative_to(src_path))
    return template_path


def test_template_loads(env, template_path):
    env.get_template(template_path)


def test_template_renders(env, params, template_path, snapshot):
    template = env.get_template(template_path)
    template_output = template.render(params=params)
    assert template_output == snapshot


def test_dm_alert_with_no_attributes(env, snapshot):
    """Test that we don't get an undefined error when rendering dmAlert"""
    # TODO: this test is here to catch a regression, ideally it would be
    # replaced with a proper test suite for the component (see
    # https://trello.com/c/gw8q0xdl)
    template = env.from_string("""
        {% from "digitalmarketplace/components/alert/macro.njk" import dmAlert %}
        {{ dmAlert({"text": "Alert body"}) }}
    """)
    template_output = template.render()

    assert template_output == snapshot
