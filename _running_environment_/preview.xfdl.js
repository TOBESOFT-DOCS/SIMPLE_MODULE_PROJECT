(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {            
            this.set_name("preview");
            this.set_titletext("Component Preview");
            if (nexacro.Form == this.constructor)
            {
                this._setFormPosition(405,200);
            }
         
            // UI Components Initialize
            obj = new nexacro.TwoMonthCalendar("TwoMonthCalendar", "0", "0", "100%", "100%", null, null, null, null, null, null, this);
            this.addChild(obj.name, obj);
            
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",405,200,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script

        
        // Regist UI Components Event
        this.on_initEvent = function()
        {

        };

        this.loadIncludeScript("preview.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
