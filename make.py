import pygments
import pystache
import markdown
import os
import random
from colour import Color

# encoding=utf8  
import sys  

reload(sys)  
sys.setdefaultencoding('utf8')

renderer = pystache.Renderer(search_dirs=["templates/", "assets/html/"], file_extension = None)
renderer.load_template('site_template')

files = os.listdir('./md') #list of md files to convert to html

#each entry is a tuple, first elem is html, second is dict of metadata, last is filename
postList = []

md = markdown.Markdown(extensions=['meta','markdown.extensions.fenced_code','markdown.extensions.codehilite',])

class basicPage(object):
    def about(self):
        return 'a b o u t'
    def posts(self):
        return 'p o s t s'
    def projects(self):
        return 'p r o j e c t s'
    def aboutLink(self):
        return "about.html"
    def indexLink(self):
        return "index.html"
    def projectsLink(self):
        return "#"
    def upDir(self):
        return ""
    def extras(self):
        return ""

def _render_single_post(post):
    
    htmlPost = open('./posts/'+ file[0:len(file)-3]+'.html', 'w+')

    renderer.load_template('site_template')
    class _siteTemplate(basicPage):
        def siteBody(self):
            return post[0]
        def aboutLink(self):
            return "../about.html"
        def indexLink(self):
            return "../index.html"
        def projectsLink(self):
            return "#"
        def upDir(self):
            return "../"
        def extras(self):
            return "textPost"
        
    #temp= "<span class='textPost'>"
    temp = renderer.render(_siteTemplate())
    #temp += "</span>"
    htmlPost.write(temp)
    htmlPost.close()

    
for file in files:
    with open('md/'+file, 'r') as myfile:

        if file[len(file)-2:len(file)] == "md":
            html = myfile.read()
            temp = []
            temp.append(md.convert(html))

            temp.append(md.Meta)
            temp.append(file)
            postList.append(temp)

            _render_single_post(temp)

            


# sort list by dates here, convert to standard format first






    
def render_about():
    renderer.load_template('site_template')
    with open('assets/html/about.html', 'r') as myfile:
        about_template = myfile.read()
        
        class _siteTemplate(basicPage):
            def about(self):
                return '| a b o u t |'
            def siteBody(self):
                return str(about_template)
            
        rendered_about = open("about.html", "w+")
        rendered_about.write(renderer.render(_siteTemplate()))
        rendered_about.close()

def render_index():
    bodyString = ""
    cssString = ""
    
    renderer.load_template('post_entry')
    
    r = lambda: random.randint(0,255)
    init_col = Color(hsl=(0, .4, .7))
    inc = .05
    count = 1;
    for post in postList:
        class _postEntry(object):

            def title(self):
                return post[1]['title'][0]
            def number(self):
                return str(count)
            def link(self):
                return './posts/'+ post[2][0:len(post[2])-3]+'.html'
        
        bodyString += renderer.render(_postEntry())
        

        renderer.load_template('custom_colors')

        class _customColors(object):
            def color(self):
                return  Color(hsl = (init_col.hsl[0], .9, .8)).hex
            def id(self):
                return str(count)
            def firstColor(self):
                return init_col.hex
            
                    
        cssString += renderer.render(_customColors())
                    
        count += 1;
        init_col = Color(hsl = (init_col.hsl[0]+ inc, .4,.7))

    class _siteTemplate(basicPage):
            def posts(self):
                return '| p o s t s |'
            def siteBody(self):
                return bodyString
    renderer.load_template('site_template')
    rendered_about = open("index.html", "w+")
    rendered_about.write(renderer.render(_siteTemplate()))
    rendered_about.close()
    rendered_customColors = open("assets/css/custom_colors.css", "w+")
    rendered_customColors.write(cssString)
    rendered_customColors.close()
            

    
    
render_about()
render_index()
